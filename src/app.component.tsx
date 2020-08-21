import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';
import {useColorScheme} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {Provider, useDispatch} from 'react-redux';
import {
  PaperProvider,
  DefaultTheme,
  DarkTheme,
  LoadingModal,
  CheckUpdate,
  merge,
  usePushNotification,
  useErrorHandler,
  useShallowEqualSelector,
} from '@app/core';
import {store, RootState, Dispatch} from '@app/stores';
import {AuthProvider} from '@auth/contexts';
import {i18next} from '@app/i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const colorScheme = useColorScheme();
  const {language, theme, loading, isTester, isLoadedFromStorage} = useShallowEqualSelector((state: RootState) => ({
    isLoadedFromStorage: state.isLoadedFromStorage,
    language: state.settings.language,
    theme: state.settings.theme,
    loading: state.loading,
    isTester: state.settings.isTester,
  }));
  const {
    settings: {setColorScheme},
    internetConnection: {setInternetConnection},
  } = useDispatch<Dispatch>();

  const paperTheme: typeof DarkTheme = merge({}, theme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: theme.colors.primary},
  });

  usePushNotification();
  useErrorHandler();

  useEffect(() => {
    if (isLoadedFromStorage) {
      RNBootSplash.hide({duration: 500});
    }
  }, [isLoadedFromStorage]);

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
          <CheckUpdate isTester={isTester} />
        </PaperProvider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <AuthProvider>
          <BaseApp />
        </AuthProvider>
      </I18nextProvider>
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
