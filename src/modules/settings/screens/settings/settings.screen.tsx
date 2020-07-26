import React from 'react';
import {useTranslation} from 'react-i18next';
import {appFullVersion} from '@core/config';
import {Text, Appbar, Colors} from '@core/components';

export const SettingsScreen = (): JSX.Element => {
  const {t} = useTranslation('');
  return (
    <>
      <Appbar.Header style={{backgroundColor: Colors.amber500}}>
        <Appbar.Content title={t('common:settings')} />
      </Appbar.Header>
      <Text>{`Version: ${appFullVersion()}`}</Text>
    </>
  );
};
