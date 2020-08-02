import React, {useState, useContext} from 'react';

interface LoadingProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (loading: boolean) => void;

export const DEFAULT_LOADING = false;

const LoadingContext = React.createContext(DEFAULT_LOADING);
const LoadingDispatchContext = React.createContext<Dispatch>(undefined as never);

const LoadingProvider = (props: LoadingProviderProps): JSX.Element => {
  const {children} = props;
  const [Loading, setLoading] = useState(DEFAULT_LOADING);
  return (
    <LoadingContext.Provider value={Loading}>
      <LoadingDispatchContext.Provider value={setLoading}>{children}</LoadingDispatchContext.Provider>
    </LoadingContext.Provider>
  );
};

const useLoading = (): [boolean, Dispatch] => {
  const loading = useContext(LoadingContext);
  const setLoading = useContext(LoadingDispatchContext);
  return [loading, setLoading];
};

export {LoadingProvider, useLoading};
