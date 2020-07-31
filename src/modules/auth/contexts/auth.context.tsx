import React, {useContext, useEffect, useMemo} from 'react';
import {useImmer} from 'use-immer';
import {usePersistenceImmer} from '@core/hooks';

interface AuthProviderProps {
  children?: React.ReactNode;
}

type SignInType = 'EMAIL' | 'PHONE_NO' | 'FACEBOOK' | 'GOOGLE' | 'APPLE';

interface AuthState {
  userId: string;
  signInType: SignInType;
  isSignedIn: boolean;
}

interface Dispatch {}

const AUTH_KEY = 'AUTH';
const DEFAULT_AUTH: AuthState = {
  userId: '',
  signInType: 'EMAIL',
  isSignedIn: false,
};

const AuthContext = React.createContext(DEFAULT_AUTH);
const AuthDispatchContext = React.createContext<Dispatch>(undefined as never);

const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const {children} = props;
  const [auth, setAuth] = useImmer(DEFAULT_AUTH);
  const [setAuthPersistence] = usePersistenceImmer(auth, setAuth, AUTH_KEY);

  useEffect(() => {
    setAuthPersistence((draft) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useMemo((): Dispatch => ({}), []);
  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

const useAuth = (): [AuthState, Dispatch] => {
  const theme = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);
  return [theme, dispatch];
};

export {AuthProvider, useAuth};
