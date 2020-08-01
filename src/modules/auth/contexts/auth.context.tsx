import React, {useContext, useEffect, useMemo, useState, useCallback} from 'react';
import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {usePersistence} from '@core/hooks';
import {config} from '@core/config';

interface AuthProviderProps {
  children?: React.ReactNode;
}

export type SignInType = 'EMAIL' | 'PHONE_NO' | 'FACEBOOK' | 'GOOGLE' | 'APPLE';

interface AuthState {
  userId: string;
  displayName?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  avatarUrl?: string;
  signInType: SignInType;
  isSignedIn: boolean;
  initializing: boolean;
}

interface Dispatch {
  signInFacebook: () => Promise<boolean>;
  signInGoogle: () => Promise<boolean>;
  signInApple: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AUTH_KEY = 'AUTH';
const DEFAULT_AUTH: AuthState = {
  userId: '',
  signInType: 'EMAIL',
  isSignedIn: false,
  initializing: true,
};

const AuthContext = React.createContext(DEFAULT_AUTH);
const AuthDispatchContext = React.createContext<Dispatch>(undefined as never);

const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const {children} = props;
  const [auth, setAuth] = useState(DEFAULT_AUTH);
  const [initializing, setInitializing] = useState(true);
  const [setAuthPersistence] = usePersistence(auth, setAuth, AUTH_KEY);

  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback = useCallback((user): void => {
    if (!user) {
      setAuthPersistence(DEFAULT_AUTH);
    } else {
      let avatarUrl = user.photoURL || '';
      let signInType: SignInType = 'EMAIL';
      if (user.providerData && user.providerData.length >= 1) {
        if (user.providerData[0].providerId === 'facebook.com') {
          signInType = 'FACEBOOK';
          avatarUrl = `${avatarUrl}?type=large`;
        } else if (user.providerData[0].providerId === 'google.com') {
          signInType = 'GOOGLE';
          avatarUrl = avatarUrl.replace('s96-c', 's400-c');
        }
      }
      setAuthPersistence({
        userId: user.uid,
        displayName: user.displayName || undefined,
        firstName: user.displayName || undefined,
        avatarUrl,
        isSignedIn: true,
        signInType,
        initializing: false,
      });
    }
    if (initializing) {
      setInitializing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscriber = firebaseAuth().onAuthStateChanged(onAuthStateChanged);
    GoogleSignin.configure({
      webClientId: config().google.webClientId,
    });

    return subscriber; // unsubscribe
  }, [onAuthStateChanged]);

  const signInFacebook = async (): Promise<boolean> => {
    const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (loginResult.isCancelled) {
      return false;
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = firebaseAuth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    await firebaseAuth().signInWithCredential(facebookCredential);

    return true;
  };

  const signInGoogle = async (): Promise<boolean> => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = firebaseAuth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await firebaseAuth().signInWithCredential(googleCredential);
    } catch (err) {
      if (
        err.code === statusCodes.SIGN_IN_CANCELLED ||
        err.code === statusCodes.IN_PROGRESS ||
        err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        // user cancelled the login flow
        return false;
      }

      throw err;
    }
    return true;
  };
  const signInApple = async (): Promise<boolean> => {
    return false;
  };

  const signOut = async (): Promise<void> => {
    setAuthPersistence(DEFAULT_AUTH);
    if (firebaseAuth().currentUser) {
      await firebaseAuth().signOut();
    }
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (err) {
      // ignore err
    }
  };

  const dispatch = useMemo(
    (): Dispatch => ({
      signInFacebook,
      signInGoogle,
      signInApple,
      signOut,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const authState = useMemo(() => ({...auth, initializing}), [auth, initializing]);
  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

const useAuth = (): [AuthState, Dispatch] => {
  const auth = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);
  return [auth, dispatch];
};

export {AuthProvider, useAuth};
