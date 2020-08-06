import React, {useState, useContext, useCallback} from 'react';

interface ClearSignInFormProviderProps {
  children?: React.ReactNode;
}

type Dispatch = () => void;

export const DEFAULT_TOGGLE = false;

const ClearSignInFormContext = React.createContext(DEFAULT_TOGGLE);
const ClearSignInFormDispatchContext = React.createContext<Dispatch>(undefined as never);

const ClearSignInFormProvider = (props: ClearSignInFormProviderProps): JSX.Element => {
  const {children} = props;
  const [toggle, setToggle] = useState(DEFAULT_TOGGLE);

  const clearSignInForm = useCallback(() => {
    setToggle((prevValue) => !prevValue);
  }, []);

  return (
    <ClearSignInFormContext.Provider value={toggle}>
      <ClearSignInFormDispatchContext.Provider value={clearSignInForm}>
        {children}
      </ClearSignInFormDispatchContext.Provider>
    </ClearSignInFormContext.Provider>
  );
};

const useClearSignInForm = (): {toggleClearSignInForm: boolean; clearSignInForm: Dispatch} => {
  const toggleClearSignInForm = useContext(ClearSignInFormContext);
  const clearSignInForm = useContext(ClearSignInFormDispatchContext);
  return {toggleClearSignInForm, clearSignInForm};
};

export {ClearSignInFormProvider, useClearSignInForm};
