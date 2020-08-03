import React, {useState, useContext} from 'react';

interface SignInToggleClearFormProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (SignInToggleClearForm: boolean) => void;

export const DEFAULT_SIGN_IN_TOGGLE_CLEAR_FORM = false;

const SignInToggleClearFormContext = React.createContext(DEFAULT_SIGN_IN_TOGGLE_CLEAR_FORM);
const SignInToggleClearFormDispatchContext = React.createContext<Dispatch>(undefined as never);

const SignInToggleClearFormProvider = (props: SignInToggleClearFormProviderProps): JSX.Element => {
  const {children} = props;
  const [SignInToggleClearForm, setSignInToggleClearForm] = useState(DEFAULT_SIGN_IN_TOGGLE_CLEAR_FORM);
  return (
    <SignInToggleClearFormContext.Provider value={SignInToggleClearForm}>
      <SignInToggleClearFormDispatchContext.Provider value={setSignInToggleClearForm}>
        {children}
      </SignInToggleClearFormDispatchContext.Provider>
    </SignInToggleClearFormContext.Provider>
  );
};

const useSignInToggleClearForm = (): [boolean, Dispatch] => {
  const SignInToggleClearForm = useContext(SignInToggleClearFormContext);
  const setSignInToggleClearForm = useContext(SignInToggleClearFormDispatchContext);
  return [SignInToggleClearForm, setSignInToggleClearForm];
};

export {SignInToggleClearFormProvider, useSignInToggleClearForm};
