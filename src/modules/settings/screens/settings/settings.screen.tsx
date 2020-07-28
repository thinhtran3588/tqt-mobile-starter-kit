import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, List, Layout, ScrollView} from '@core/components';
import {ThemeSetting, PrimaryColorSetting, GeneralInfo, LanguageSetting} from './components';

export const SettingsScreen = (): JSX.Element => {
  const {t} = useTranslation('settings');
  return (
    <Layout headerTitle={t('common:settings')}>
      <ScrollView>
        <ThemeSetting />
        <PrimaryColorSetting />
        <LanguageSetting />
        <List.Subheader>
          <Text type='h4'>{t('generalInfo')}</Text>
        </List.Subheader>
        <GeneralInfo />
      </ScrollView>
    </Layout>
  );
};
