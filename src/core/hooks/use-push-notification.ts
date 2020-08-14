import {useEffect, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Notifications, Notification} from 'react-native-notifications';
import {useNotification} from './use-notification';

export interface ShowPushNotificationParams {
  title?: string;
  message?: string;
  date?: Date;
  extra?: string;
  id: number;
}

export interface PushNotificationResult {
  showPushNotification: (params: ShowPushNotificationParams) => void;
}

export const usePushNotification = (): PushNotificationResult => {
  const {showNotification} = useNotification();
  const showPushNotification = useCallback((params: ShowPushNotificationParams): void => {
    const {title, message: body, date: fireDate, extra, id} = params;
    Notifications.postLocalNotification(
      ({
        body,
        title,
        fireDate,
        extra,
      } as unknown) as Notification,
      id,
    );
  }, []);

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

      // Local notifications
      Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
        // ios only
        // eslint-disable-next-line no-console
        console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
        completion({alert: true, sound: true, badge: true});
      });

      Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
        // eslint-disable-next-line no-console
        console.log(`Notification opened: ${JSON.stringify(notification.payload)}`);
        completion();
      });

      return () => {
        unsubscribe();
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {showPushNotification};
};
