import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, List, Layout, ScrollView, Divider} from '@core/components';
import {ThemeSetting, GeneralInfo, LanguageSetting, SignOut, Profile} from './components';

export const SettingsScreen = (): JSX.Element => {
  const {t} = useTranslation('settings');
  return (
    <Layout headerTitle={t('common:settings')}>
      <ScrollView>
        <Profile />
        <Divider />
        <ThemeSetting />
        <LanguageSetting />
        <List.Subheader>
          <Text type='h4'>{t('generalInfo')}</Text>
        </List.Subheader>
        <Divider />
        <GeneralInfo />
        <SignOut />
      </ScrollView>
    </Layout>
  );
};
