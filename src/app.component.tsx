import React, {useState, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {
  AppThemeProvider,
  useAppTheme,
  PrimaryColorProvider,
  usePrimaryColor,
  LanguageProvider,
  useLanguage,
} from '@core/contexts';
import {sleep, merge} from '@core/helpers';
import {LoadingScreen, PaperProvider, DefaultTheme, DarkTheme} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [appTheme] = useAppTheme();
  const [primaryColor] = usePrimaryColor();
  const [language] = useLanguage();
  const theme = merge({}, appTheme.theme === 'dark' ? DarkTheme : DefaultTheme, {colors: {primary: primaryColor}});
  useEffect(() => {
    (async () => {
      RNBootSplash.hide({duration: 500});
      await sleep(1000);
      setIsBootstrapping(false);
    })();
  }, []);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  if (isBootstrapping) {
    return <LoadingScreen />;
  }
  return (
    <I18nextProvider i18n={i18next}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </I18nextProvider>
  );
};

export const App = (): JSX.Element => {
  return (
    <LanguageProvider>
      <AppThemeProvider>
        <PrimaryColorProvider>
          <BaseApp />
        </PrimaryColorProvider>
      </AppThemeProvider>
    </LanguageProvider>
  );
};
