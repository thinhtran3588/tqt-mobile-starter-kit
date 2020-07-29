import React, {useState, useContext, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

interface InternetConnectionProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (internetConnection: boolean) => void;

export const DEFAULT_INTERNET_CONNECTION = true;

const InternetConnectionContext = React.createContext(DEFAULT_INTERNET_CONNECTION);

const InternetConnectionProvider = (props: InternetConnectionProviderProps): JSX.Element => {
  const {children} = props;
  const [internetConnection, setInternetConnection] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternetConnection(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <InternetConnectionContext.Provider value={internetConnection}>{children}</InternetConnectionContext.Provider>;
};

const useInternetConnection = (): boolean => {
  const internetConnection = useContext(InternetConnectionContext);
  return internetConnection;
};

export {InternetConnectionProvider, useInternetConnection};
