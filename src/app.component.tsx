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
  COLORS_LOOKUP,
  LoadingProvider,
  useLoading,
  ErrorHandlerProvider,
} from '@core/contexts';
import {AuthProvider, useAuth} from '@auth/contexts';
import {merge, setNotificationTheme, checkUpdate} from '@core/helpers';
import {PaperProvider, DefaultTheme, DarkTheme, LoadingModal} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const [appTheme] = useAppTheme();
  const [language] = useLanguage();
  const [loading] = useLoading();
  const [auth] = useAuth();
  const themedPrimaryColor = (COLORS_LOOKUP[appTheme.primaryColorId] || COLORS_LOOKUP.CYAN)[
    appTheme.theme === 'dark' ? 'darkColor' : 'color'
  ];
  const theme: typeof DarkTheme = merge({}, appTheme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: themedPrimaryColor},
  });

  useEffect(() => {
    checkUpdate(auth.isTester);
  }, [auth.isTester]);

  useEffect(() => {
    (async () => {
      RNBootSplash.hide({duration: 500});
    })();
  }, []);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    setNotificationTheme(appTheme.theme);
  }, [appTheme]);

  return (
    <>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
      <LoadingModal loading={loading} />
    </>
  );
};

export const App = (): JSX.Element => {
  return (
    <RootSiblingParent>
      <LoadingProvider>
        <LanguageProvider>
          <I18nextProvider i18n={i18next}>
            <ErrorHandlerProvider>
              <AuthProvider>
                <InternetConnectionProvider>
                  <AppThemeProvider>
                    <SafeAreaProvider>
                      <BaseApp />
                    </SafeAreaProvider>
                  </AppThemeProvider>
                </InternetConnectionProvider>
              </AuthProvider>
            </ErrorHandlerProvider>
          </I18nextProvider>
        </LanguageProvider>
      </LoadingProvider>
    </RootSiblingParent>
  );
};
