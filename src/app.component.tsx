import React, {useState, useEffect} from 'react';
import {RootLayout, LoadingScreen, Text, Icon, PaperProvider, PaperDefaultTheme, Button, Alert} from '@core/components';
import {useTranslation, I18nextProvider} from 'react-i18next';
import {sleep} from '@tqt/mobile';
import {i18next} from './i18n';

const BaseApp = (): JSX.Element => {
  const {t} = useTranslation('common');

  const onPress = (): void => {
    Alert.alert('Alert', 'test');
  };

  return (
    <RootLayout>
      <Text type='h1'>H1</Text>
      <Text type='h2'>H2</Text>
      <Text type='h3'>H3</Text>
      <Text type='h4'>H4</Text>
      <Text type='h5'>H5</Text>
      <Text type='h6'>H6</Text>
      <Text type='label'>label</Text>
      <Text type='p'>paragraph</Text>
      <Text uppercase>uppercase</Text>
      <Text lowercase>LOWERCASE</Text>
      <Text lowercase>{t('settings')}</Text>
      <Icon name='home' size={25} />
      <Button icon='camera' mode='contained' onPress={onPress}>
        Press me
      </Button>
    </RootLayout>
  );
};

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
    <I18nextProvider i18n={i18next}>
      <PaperProvider theme={theme}>
        <BaseApp />
      </PaperProvider>
    </I18nextProvider>
  );
};
