import React, {useState, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import {sleep} from '@core/helpers';
import {LoadingScreen, PaperProvider, PaperDefaultTheme} from '@core/components';
import {i18next} from './i18n';
import {AppNavigation} from './app.navigation';

export const App = (): JSX.Element => {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const theme: typeof PaperDefaultTheme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: 'tomato',
      accent: 'yellow',
    },
    dark: true,
    roundness: 10,
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
