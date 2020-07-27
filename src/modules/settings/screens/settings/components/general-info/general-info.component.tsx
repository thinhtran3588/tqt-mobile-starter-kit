import React from 'react';
import {useTranslation} from 'react-i18next';
import {ListItem} from '@core/components';
import {config, appFullVersion} from '@app/core/config';

export const GeneralInfo = (): JSX.Element => {
  const {t} = useTranslation('settings');
  return (
    <>
      <ListItem title={t('author')} description={config().appInfo.author} leftIcon='human-greeting' />
      <ListItem title={t('copyright')} description={config().appInfo.copyright} leftIcon='copyright' />
      <ListItem title={t('version')} description={appFullVersion()} leftIcon='shoe-print' />
    </>
  );
};
