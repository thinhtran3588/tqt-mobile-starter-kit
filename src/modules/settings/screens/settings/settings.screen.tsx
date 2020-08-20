import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, List, Layout, ScrollView, Divider} from '@app/core';
import {ThemeSetting, GeneralInfo, LanguageSetting, SignOut, Profile, BetaUserSetting} from './components';

export const SettingsScreen = (): JSX.Element => {
  const {t} = useTranslation('settings');
  return (
    <Layout headerTitle={t('common:settings')}>
      <ScrollView>
        <Profile />
        <Divider />
        <ThemeSetting />
        <LanguageSetting />
        <BetaUserSetting />
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
