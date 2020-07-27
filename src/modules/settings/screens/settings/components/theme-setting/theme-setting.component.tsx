import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '@core/contexts';
import {ListItem} from '@core/components';

export const ThemeSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [appTheme, {setDarkMode, setUseSystemTheme}] = useAppTheme();
  return (
    <>
      <ListItem
        title={t('useSystemTheme')}
        leftIcon='theme-light-dark'
        switchRight
        switchRightValue={appTheme.useSystemTheme}
        switchRightOnValueChange={setUseSystemTheme}
        switchRightTestID='system-theme-switch'
      />
      <ListItem
        title={t('darkTheme')}
        leftIcon='theme-light-dark'
        switchRight
        switchRightValue={appTheme.darkMode}
        switchRightOnValueChange={setDarkMode}
        switchRightDisabled={appTheme.useSystemTheme}
        switchRightTestID='dark-theme-switch'
      />
    </>
  );
};
