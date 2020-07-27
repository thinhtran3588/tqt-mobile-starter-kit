import React, {useState, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {AppThemeProvider, useAppTheme, PrimaryColorProvider, usePrimaryColor} from '@core/contexts';
import {sleep, merge} from '@core/helpers';
import {LoadingScreen, PaperProvider, DefaultTheme, DarkTheme} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';

export const BaseApp = (): JSX.Element => {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [appTheme] = useAppTheme();
  const [primaryColor] = usePrimaryColor();
  const theme = merge({}, appTheme.theme === 'dark' ? DarkTheme : DefaultTheme, {colors: {primary: primaryColor}});
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
      <PrimaryColorProvider>
        <BaseApp />
      </PrimaryColorProvider>
    </AppThemeProvider>
  );
};
