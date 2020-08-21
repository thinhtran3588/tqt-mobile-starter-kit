import {createModel} from '@rematch/core';
import {RootModel} from '@app/stores';

export type SignInType = 'EMAIL' | 'PHONE_NO' | 'FACEBOOK' | 'GOOGLE' | 'APPLE';

interface AuthState {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
  signInType: SignInType;
  isSignedIn: boolean;
}

// default state
const state: AuthState = {
  userId: '',
  avatarUrl: '',
  displayName: '',
  signInType: 'EMAIL',
  isSignedIn: false,
};

const setAuth = (draft: AuthState, newAuth: AuthState): AuthState => {
  Object.assign(draft, newAuth);
  return draft;
};

const clearAuth = (draft: AuthState): AuthState => {
  Object.assign(draft, state);
  return draft;
};

export const auth = createModel<RootModel>()({
  state,
  reducers: {
    setAuth,
    clearAuth,
  },
  effects: (_dispatch) => ({}),
});
