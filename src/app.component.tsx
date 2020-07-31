import React, {useState, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  AppThemeProvider,
  useAppTheme,
  LanguageProvider,
  useLanguage,
  InternetConnectionProvider,
  COLORS_LOOKUP,
} from '@core/contexts';
import {sleep, merge} from '@core/helpers';
import {LoadingScreen, PaperProvider, DefaultTheme, DarkTheme} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [appTheme] = useAppTheme();
  const [language] = useLanguage();
  const themedPrimaryColor = (COLORS_LOOKUP[appTheme.primaryColorId] || COLORS_LOOKUP.CYAN)[
    appTheme.theme === 'dark' ? 'darkColor' : 'color'
  ];
  const theme: typeof DarkTheme = merge({}, appTheme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: themedPrimaryColor},
  });

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
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </PaperProvider>
    </I18nextProvider>
  );
};

export const App = (): JSX.Element => {
  return (
    <InternetConnectionProvider>
      <LanguageProvider>
        <AppThemeProvider>
          <BaseApp />
        </AppThemeProvider>
      </LanguageProvider>
    </InternetConnectionProvider>
  );
};
