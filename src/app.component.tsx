import React, {useState, useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {NavigationContainer} from '@react-navigation/native';
import {sleep} from '@tqt/mobile';
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
      await sleep(1000);
      setIsBootstrapping(false);
    })();
  }, []);
  if (isBootstrapping) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      <I18nextProvider i18n={i18next}>
        <PaperProvider theme={theme}>
          <AppNavigation />
        </PaperProvider>
      </I18nextProvider>
    </NavigationContainer>
  );
};
