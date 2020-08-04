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
} from '@core/contexts';
import {AuthProvider} from '@auth/contexts';
import {merge, setNotificationTheme} from '@core/helpers';
import {PaperProvider, DefaultTheme, DarkTheme, LoadingModal} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';
import {handleGlobalException} from './core/exceptions/handle-global-exception';

export const BaseApp = (): JSX.Element => {
  const [appTheme] = useAppTheme();
  const [language] = useLanguage();
  const [loading] = useLoading();
  const themedPrimaryColor = (COLORS_LOOKUP[appTheme.primaryColorId] || COLORS_LOOKUP.CYAN)[
    appTheme.theme === 'dark' ? 'darkColor' : 'color'
  ];
  const theme: typeof DarkTheme = merge({}, appTheme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: themedPrimaryColor},
  });

  useEffect(() => {
    (async () => {
      RNBootSplash.hide({duration: 500});
      handleGlobalException(i18next.t);
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
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </PaperProvider>
      <LoadingModal loading={loading} />
    </>
  );
};

export const App = (): JSX.Element => {
  return (
    <RootSiblingParent>
      <LanguageProvider>
        <AuthProvider>
          <InternetConnectionProvider>
            <AppThemeProvider>
              <LoadingProvider>
                <I18nextProvider i18n={i18next}>
                  <BaseApp />
                </I18nextProvider>
              </LoadingProvider>
            </AppThemeProvider>
          </InternetConnectionProvider>
        </AuthProvider>
      </LanguageProvider>
    </RootSiblingParent>
  );
};
