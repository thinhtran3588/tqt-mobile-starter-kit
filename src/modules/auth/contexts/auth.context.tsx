import React, {useContext, useEffect, useMemo, useState, useCallback} from 'react';
import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import {usePersistence} from '@core/hooks';
import {config} from '@core/config';
import {AppError} from '@core/exceptions';
import {useLanguage} from '@core/contexts';

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

interface SignUpEmailParams {
  email: string;
  password: string;
}

interface SignInEmailParams extends SignUpEmailParams {}

interface Dispatch {
  signInFacebook: () => Promise<boolean>;
  signInGoogle: () => Promise<boolean>;
  signInApple: () => Promise<boolean>;
  signUpEmail: (params: SignUpEmailParams) => Promise<boolean>;
  signInEmail: (params: SignInEmailParams) => Promise<boolean>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  sendPhoneNoVerificationCode: (phoneNo: string) => Promise<void>;
  verifyCode: (verificationCode: string) => Promise<void>;
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

let confirmationResult: FirebaseAuthTypes.ConfirmationResult;

const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const {children} = props;
  const [auth, setAuth] = useState(DEFAULT_AUTH);
  const [initializing, setInitializing] = useState(true);
  const [setAuthPersistence] = usePersistence(auth, setAuth, AUTH_KEY);
  const [language] = useLanguage();

  useEffect(() => {
    firebaseAuth().languageCode = language;
  }, [language]);

  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback = useCallback((user): void => {
    if (!user) {
      setAuthPersistence(DEFAULT_AUTH);
    } else {
      let avatarUrl = user.photoURL || '';
      let signInType: SignInType = 'EMAIL';
      let displayName = user.displayName || undefined;
      if (user.providerData && user.providerData.length >= 1) {
        if (user.providerData[0].providerId === 'facebook.com') {
          signInType = 'FACEBOOK';
          avatarUrl = `${avatarUrl}?type=large`;
        } else if (user.providerData[0].providerId === 'google.com') {
          signInType = 'GOOGLE';
          avatarUrl = avatarUrl.replace('s96-c', 's400-c');
        } else if (user.providerData[0].providerId === 'apple.com') {
          signInType = 'APPLE';
          displayName = displayName || user.providerData[0].email;
        } else if (user.providerData[0].providerId === 'phone') {
          signInType = 'PHONE_NO';
          displayName = displayName || user.providerData[0].phoneNumber;
        } else {
          signInType = 'EMAIL';
          displayName = displayName || user.providerData[0].email;
        }
      }
      setAuthPersistence({
        userId: user.uid,
        displayName,
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
    try {
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
    } catch (err) {
      if (err.code === 'auth/user-disabled') {
        throw new AppError('USER_DISABLED', 'auth:userDisabledError');
      }
      throw err;
    }
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
      if (err.code === 'auth/user-disabled') {
        throw new AppError('USER_DISABLED', 'auth:userDisabledError');
      }
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
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = firebaseAuth.AppleAuthProvider.credential(identityToken, nonce);

      // Sign the user in with the credential
      await firebaseAuth().signInWithCredential(appleCredential);
    } catch (err) {
      if (err.code === 'auth/user-disabled') {
        throw new AppError('USER_DISABLED', 'auth:userDisabledError');
      }
      if (err.code === '1001') {
        // user cancelled the login flow
        return false;
      }
      throw err;
    }
    return true;
  };

  const signUpEmail = async (params: SignUpEmailParams): Promise<boolean> => {
    try {
      const {email, password} = params;
      // Create a new user in with the credential
      await firebaseAuth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      if (err.code === 'auth/user-disabled') {
        throw new AppError('USER_DISABLED', 'auth:userDisabledError');
      }
      if (err.code === 'auth/email-already-in-use') {
        throw new AppError('EMAIL_ALREADY_IN_USE', 'auth:emailAlreadyInUseError');
      }
      if (err.code === 'auth/too-many-requests') {
        throw new AppError('TOO_MANY_REQUESTS', 'auth:tooManyRequestsError');
      }
      throw err;
    }
    return true;
  };

  const signInEmail = async (params: SignInEmailParams): Promise<boolean> => {
    try {
      const {email, password} = params;
      // Sign the user in with the credential
      await firebaseAuth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      if (err.code === 'auth/user-disabled') {
        throw new AppError('USER_DISABLED', 'auth:userDisabledError');
      }
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        throw new AppError('WRONG_CREDENTIAL', 'auth:wrongCredentialError');
      }
      if (err.code === 'auth/too-many-requests') {
        throw new AppError('TOO_MANY_REQUESTS', 'auth:tooManyRequestsError');
      }
      throw err;
    }
    return true;
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

  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    try {
      await firebaseAuth().sendPasswordResetEmail(email);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        return;
      }
      throw err;
    }
  };

  const sendPhoneNoVerificationCode = async (phoneNo: string): Promise<void> => {
    try {
      confirmationResult = await firebaseAuth().signInWithPhoneNumber(phoneNo);
    } catch (err) {
      if (err.code === 'auth/user-disabled') {
        throw new AppError('USER_DISABLED', 'auth:userDisabledError');
      }
      if (err.code === 'auth/quota-exceeded') {
        throw new AppError('SMS_QUOTA_EXCEEDED', 'auth:smsQuotaExceedError');
      }
      if (err.code === 'auth/invalid-phone-number') {
        throw new AppError('INVALID_PHONE_NO', 'auth:invalidPhoneNumberError');
      }

      throw err;
    }
  };
  const verifyCode = async (verificationCode: string): Promise<void> => {
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(verificationCode);
      }
    } catch (err) {
      if (err.code === 'auth/invalid-verification-code') {
        throw new AppError('INVALID_PHONE_NO', 'auth:invalidVerificationCodeError');
      }
      throw err;
    }
  };
  const dispatch = useMemo(
    (): Dispatch => ({
      signInFacebook,
      signInGoogle,
      signInApple,
      signUpEmail,
      signInEmail,
      signOut,
      sendPasswordResetEmail,
      sendPhoneNoVerificationCode,
      verifyCode,
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
