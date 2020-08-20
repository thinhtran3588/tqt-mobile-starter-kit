import {createModel} from '@rematch/core';
import {RootModel} from '@app/stores';

export type SignInType = 'EMAIL' | 'PHONE_NO' | 'FACEBOOK' | 'GOOGLE' | 'APPLE';

interface AuthState {
  userId: string;
  displayName?: string;
  avatarUrl?: string;
  signInType: SignInType;
  isSignedIn: boolean;
  initializing: boolean;
}

// default state
const state: AuthState = {
  userId: '',
  avatarUrl: '',
  displayName: '',
  signInType: 'EMAIL',
  isSignedIn: false,
  initializing: true,
};

const setAuth = (draft: AuthState, newAuth: AuthState): AuthState => {
  Object.assign(draft, newAuth);
  return draft;
};

export const auth = createModel<RootModel>()({
  state,
  reducers: {
    setAuth,
  },
  effects: (_dispatch) => ({}),
});
