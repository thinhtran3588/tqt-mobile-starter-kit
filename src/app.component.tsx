import React, {useState, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {useColorScheme} from 'react-native';
import {AppThemeProvider, useAppTheme} from '@core/contexts';
import {sleep} from '@core/helpers';
import {LoadingScreen, PaperProvider, DefaultTheme, DarkTheme} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [appTheme] = useAppTheme();
  const colorScheme = useColorScheme();
  let useDarkTheme = true;
  if (appTheme.useSystemTheme) {
    useDarkTheme = colorScheme === 'dark';
  } else {
    useDarkTheme = appTheme.darkMode;
  }
  const theme: typeof DefaultTheme = {
    ...(useDarkTheme ? DarkTheme : DefaultTheme),
  };
  useEffect(() => {
    (async () => {
      RNBootSplash.hide({duration: 500});
      await sleep(1000);
      setIsBootstrapping(false);
    })();
  }, []);
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
    <AppThemeProvider>
      <BaseApp />
    </AppThemeProvider>
  );
};
