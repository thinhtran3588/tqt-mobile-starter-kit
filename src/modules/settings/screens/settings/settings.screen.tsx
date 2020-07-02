import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, Appbar, Colors} from '@core/components';

export const SettingsScreen = (): JSX.Element => {
  const {t} = useTranslation('');
  return (
    <>
      <Appbar.Header style={{backgroundColor: Colors.cyan500}}>
        <Appbar.Content title={t('common:settings')} />
      </Appbar.Header>
      <Text>Settings</Text>
    </>
  );
};
