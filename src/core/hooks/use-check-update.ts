import {useEffect} from 'react';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import codepush from 'react-native-code-push';
import {config} from '@core/config';
import {useAuth} from '@auth/contexts';
import {useConfirmation} from '@core/contexts/confirmation.context';

export const useCheckUpdate = (): void => {
  const {
    dispatch: {openConfirmation},
  } = useConfirmation();
  const {auth} = useAuth();
  const {t} = useTranslation();

  useEffect(() => {
    let deploymentKey = '';
    if (Platform.OS === 'android') {
      deploymentKey = auth.isTester ? config().android.codepush.stagingKey : config().android.codepush.productionKey;
    } else {
      deploymentKey = auth.isTester ? config().ios.codepush.stagingKey : config().ios.codepush.productionKey;
    }
    codepush.sync({deploymentKey, installMode: codepush.InstallMode.ON_NEXT_RESTART}, (status) => {
      if (status !== codepush.SyncStatus.UPDATE_INSTALLED) {
        return;
      }
      openConfirmation({
        message: t('common:updateRestartConfirmation'),
        buttons: [
          {
            text: t('common:cancel'),
          },
          {
            text: t('common:restart'),
            onPress: () => codepush.restartApp(),
            type: 'PRIMARY',
          },
        ],
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isTester]);
};
