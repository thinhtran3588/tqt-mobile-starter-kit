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
  ConfirmationProvider,
  useConfirmation,
} from '@core/contexts';
import {AuthProvider} from '@auth/contexts';
import {merge} from '@core/helpers';
import {PaperProvider, DefaultTheme, DarkTheme, LoadingModal, Confirmation} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';
import {useCheckUpdate} from './core/hooks/use-check-update';

export const BaseApp = (): JSX.Element => {
  const {appTheme} = useAppTheme();
  const {language} = useLanguage();
  const {loading} = useLoading();
  useCheckUpdate();

  const {
    confirmation,
    dispatch: {closeConfirmation},
  } = useConfirmation();
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
      <Confirmation confirmation={confirmation} closeConfirmation={closeConfirmation} />
    </PaperProvider>
  );
};

export const App = (): JSX.Element => {
  return (
    <RootSiblingParent>
      <LoadingProvider>
        <ConfirmationProvider>
          <LanguageProvider>
            <I18nextProvider i18n={i18next}>
              <AppThemeProvider>
                <ErrorHandlerProvider>
                  <AuthProvider>
                    <InternetConnectionProvider>
                      <SafeAreaProvider>
                        <BaseApp />
                      </SafeAreaProvider>
                    </InternetConnectionProvider>
                  </AuthProvider>
                </ErrorHandlerProvider>
              </AppThemeProvider>
            </I18nextProvider>
          </LanguageProvider>
        </ConfirmationProvider>
      </LoadingProvider>
    </RootSiblingParent>
  );
};
