import React from 'react';
import {useTranslation} from 'react-i18next';
import {appFullVersion} from '@core/config';
import {useAppTheme} from '@core/contexts';
import {Text, Appbar, Colors, List, Divider, Switch, View, Layout} from '@core/components';
import {styles} from './settings.styles';

export const SettingsScreen = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [theme, {setDarkMode, setUseSystemTheme}] = useAppTheme();
  return (
    <Layout>
      <Appbar.Header style={{backgroundColor: Colors.amber500}}>
        <Appbar.Content title={t('common:settings')} />
      </Appbar.Header>
      <List.Item
        style={styles.item}
        titleStyle={styles.itemTitle}
        title={t('useSystemTheme')}
        left={() => <List.Icon icon='theme-light-dark' />}
        right={() => (
          <View style={styles.switchContainer}>
            <Switch testID='system-theme-switch' value={theme.useSystemTheme} onValueChange={setUseSystemTheme} />
          </View>
        )}
      />
      <Divider />
      <List.Item
        style={styles.item}
        titleStyle={styles.itemTitle}
        title={t('darkTheme')}
        left={() => <List.Icon icon='theme-light-dark' />}
        disabled={theme.useSystemTheme}
        right={() => (
          <View style={styles.switchContainer}>
            <Switch
              testID='dark-theme-switch'
              value={theme.darkMode}
              onValueChange={setDarkMode}
              disabled={theme.useSystemTheme}
            />
          </View>
        )}
      />
      <Divider />
      <List.Item
        style={styles.item}
        titleStyle={styles.itemTitle}
        title={t('primaryColor')}
        left={() => <List.Icon icon='format-color-fill' />}
        right={() => <List.Icon icon='chevron-right' />}
      />
      <List.Subheader style={styles.header}>
        <Text type='h4'>{t('generalInfo')}</Text>
      </List.Subheader>
      <List.Item
        style={styles.item}
        titleStyle={styles.itemTitle}
        title={t('author')}
        description='Thinh Tran'
        left={() => <List.Icon icon='human-greeting' />}
      />
      <Divider />
      <List.Item
        style={styles.item}
        titleStyle={styles.itemTitle}
        title={t('copyright')}
        description='Copyright © 2020 by Thinh Tran'
        left={() => <List.Icon icon='copyright' />}
      />
      <Divider />
      <List.Item
        style={styles.item}
        titleStyle={styles.itemTitle}
        title={t('version')}
        description={appFullVersion()}
        left={() => <List.Icon icon='shoe-print' />}
      />
      <Divider />
    </Layout>
  );
};
