import {createModel} from '@rematch/core';
import {RootModel} from '@app/stores';

export interface SignInState {
  toggleClearForm: boolean;
}
// default state
const state: SignInState = {
  toggleClearForm: true,
};

const clearSignInForm = (draft: SignInState): SignInState => {
  draft.toggleClearForm = !draft.toggleClearForm;
  return draft;
};

export const signIn = createModel<RootModel>()({
  state,
  reducers: {
    clearSignInForm,
  },
  effects: (_dispatch) => ({}),
});
