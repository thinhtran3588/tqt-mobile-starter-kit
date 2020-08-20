import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';
import {useColorScheme} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {store, persistor, RootState, Dispatch} from '@app/stores';
import {AuthProvider, useAuth} from '@auth/contexts';
import {merge} from '@core/helpers';
import {PaperProvider, DefaultTheme, DarkTheme, LoadingModal, CheckUpdate} from '@core/components';
import {usePushNotification, useErrorHandler} from '@core/hooks';
import {i18next} from '@app/i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const {auth} = useAuth();
  const colorScheme = useColorScheme();
  const {language, theme, loading} = useSelector((state: RootState) => ({
    language: state.settings.language,
    theme: state.theme,
    loading: state.loading,
  }));
  const {
    theme: {setColorScheme},
    internetConnection: {setInternetConnection},
  } = useDispatch<Dispatch>();

  const paperTheme: typeof DarkTheme = merge({}, theme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: theme.colors.primary},
  });

  usePushNotification();
  useErrorHandler();

  useEffect(() => {
    (async () => {
      RNBootSplash.hide({duration: 500});
    })();
  }, []);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternetConnection(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [setInternetConnection]);

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <PaperProvider theme={paperTheme}>
          <AppNavigation />
          <LoadingModal loading={loading} />
          <CheckUpdate isTester={auth.isTester} />
        </PaperProvider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <AuthProvider>
            <BaseApp />
          </AuthProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export const AppHeadlessCheck = ({isHeadless}: {isHeadless: boolean}): JSX.Element | null => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    // eslint-disable-next-line no-null/no-null
    return null;
  }

  return <App />;
};
