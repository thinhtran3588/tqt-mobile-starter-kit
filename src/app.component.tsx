import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';
import {
  AppThemeProvider,
  useAppTheme,
  LanguageProvider,
  useLanguage,
  InternetConnectionProvider,
  LoadingProvider,
  useLoading,
  ErrorHandlerProvider,
} from '@core/contexts';
import {AuthProvider, useAuth} from '@auth/contexts';
import {merge} from '@core/helpers';
import {PaperProvider, DefaultTheme, DarkTheme, LoadingModal, CheckUpdate} from '@core/components';
import {usePushNotification} from '@core/hooks';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const {auth} = useAuth();
  const {appTheme} = useAppTheme();
  const {language} = useLanguage();
  const {loading} = useLoading();
  usePushNotification();

  const theme: typeof DarkTheme = merge({}, appTheme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: appTheme.colors.primary},
  });

  useEffect(() => {
    (async () => {
      RNBootSplash.hide({duration: 500});
    })();
  }, []);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <PaperProvider theme={theme}>
      <AppNavigation />
      <LoadingModal loading={loading} />
      <CheckUpdate isTester={auth.isTester} />
    </PaperProvider>
  );
};

export const App = (): JSX.Element => {
  return (
    <RootSiblingParent>
      <LanguageProvider>
        <I18nextProvider i18n={i18next}>
          <LoadingProvider>
            <AppThemeProvider>
              <SafeAreaProvider>
                <InternetConnectionProvider>
                  <ErrorHandlerProvider>
                    <AuthProvider>
                      <BaseApp />
                    </AuthProvider>
                  </ErrorHandlerProvider>
                </InternetConnectionProvider>
              </SafeAreaProvider>
            </AppThemeProvider>
          </LoadingProvider>
        </I18nextProvider>
      </LanguageProvider>
    </RootSiblingParent>
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
