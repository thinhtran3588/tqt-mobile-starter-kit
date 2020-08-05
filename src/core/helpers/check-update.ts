import {Platform, Alert} from 'react-native';
import codepush from 'react-native-code-push';
import {config} from '@core/config';

export const checkUpdate = async (isTester: boolean): Promise<void> => {
  let deploymentKey = '';
  if (Platform.OS === 'android') {
    deploymentKey = isTester ? config().android.codepush.stagingKey : config().android.codepush.productionKey;
  } else {
    deploymentKey = isTester ? config().ios.codepush.stagingKey : config().ios.codepush.productionKey;
  }
  try {
    await codepush.sync({deploymentKey, installMode: codepush.InstallMode.ON_NEXT_RESTART}, (status) => {
      if (status === codepush.SyncStatus.UPDATE_INSTALLED) {
        Alert.alert('Alert', 'A new version is installed. Restart now?', [
          {
            text: 'Restart',
            onPress: () => codepush.restartApp(),
          },
          {
            text: 'Close',
            style: 'cancel',
          },
        ]);
      }
    });
  } catch (error) {
    // ignore
  }
};
