import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import codepush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';
import {useTranslation} from 'react-i18next';
import {config} from '@core/config';
import {Confirmation} from '../confirmation/confirmation.component';

export interface CheckUpdateProps {
  isTester: boolean;
}
const CheckUpdate = (props: CheckUpdateProps): JSX.Element => {
  const {isTester} = props;
  const {t} = useTranslation('common');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let deploymentKey = '';
    if (Platform.OS === 'android') {
      deploymentKey = isTester ? config().android.codepush.stagingKey : config().android.codepush.productionKey;
    } else {
      deploymentKey = isTester ? config().ios.codepush.stagingKey : config().ios.codepush.productionKey;
    }
    codepush.sync({deploymentKey, installMode: codepush.InstallMode.ON_NEXT_RESTART}, (status) => {
      if (status !== codepush.SyncStatus.UPDATE_INSTALLED) {
        return;
      }
      setOpen(true);
    });
    codepush.getUpdateMetadata().then((update) => {
      if (update) {
        Sentry.setRelease(`${update.appVersion}-codepush:${update.label}`);
      }
    });
  }, [isTester, t]);
  return (
    <Confirmation
      message={t('common:updateRestartConfirmation')}
      open={open}
      onClose={() => setOpen(false)}
      buttons={[
        {
          text: t('common:cancel'),
        },
        {
          text: t('common:restart'),
          onPress: () => codepush.restartApp(),
          type: 'PRIMARY',
        },
      ]}
    />
  );
};
export {CheckUpdate};
