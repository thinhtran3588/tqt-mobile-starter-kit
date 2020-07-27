import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, Appbar, Colors, List, Layout} from '@core/components';
import {ThemeSetting, PrimaryColorSetting, GeneralInfo, LanguageSetting} from './components';

export const SettingsScreen = (): JSX.Element => {
  const {t} = useTranslation('settings');
  return (
    <Layout>
      <Appbar.Header style={{backgroundColor: Colors.amber500}}>
        <Appbar.Content title={t('common:settings')} />
      </Appbar.Header>
      <ThemeSetting />
      <PrimaryColorSetting />
      <LanguageSetting />
      <List.Subheader>
        <Text type='h4'>{t('generalInfo')}</Text>
      </List.Subheader>
      <GeneralInfo />
    </Layout>
  );
};
