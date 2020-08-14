import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useNotification} from './use-notification';

export const usePushNotification = (): void => {
  const {showNotification} = useNotification();
  useEffect(() => {
    (async () => {
      // request notification permissions
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (!enabled) {
        return () => {};
      }

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        if (remoteMessage.notification?.body) {
          showNotification({message: remoteMessage.notification?.body, type: 'INFO'});
        }
      });

      messaging().subscribeToTopic('all');
      messaging()
        .getToken()
        .then((token) => {
          // TODO: register user token
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log('fcm token:', token);
          }
        });

      return () => {
        unsubscribe();
      };
    })();
  }, [showNotification]);
};
