import React, {useContext, useEffect, useMemo, useState, useCallback} from 'react';
import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {usePersistence} from '@core/hooks';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

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
  signInFacebook: () => Promise<void>;
  signInGoogle: () => Promise<void>;
  signInApple: () => Promise<void>;
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
      let avatarUrl = user.photoURL || 'undefined';
      let signInType: SignInType = 'EMAIL';
      if (user.providerData && user.providerData.length >= 1) {
        if (user.providerData[0].providerId === 'facebook.com') {
          signInType = 'FACEBOOK';
          if (avatarUrl) {
            avatarUrl = `${avatarUrl}?width=300`;
          }
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
    return subscriber; // unsubscribe
  }, [onAuthStateChanged]);

  const signInFacebook = async (): Promise<void> => {
    try {
      const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (loginResult.isCancelled) {
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = firebaseAuth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      await firebaseAuth().signInWithCredential(facebookCredential);
    } catch (err) {
      // ignore
    }
  };
  const signInGoogle = async (): Promise<void> => {};
  const signInApple = async (): Promise<void> => {};

  const signOut = async (): Promise<void> => {
    setAuthPersistence(DEFAULT_AUTH);
    if (firebaseAuth().currentUser) {
      await firebaseAuth().signOut();
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
