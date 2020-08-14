import React, {useState} from 'react';
import dayjs from 'dayjs';
import {Button} from '@core/components';
import {usePushNotification} from '@core/hooks';
import {styles} from './local-notification-sample.styles';

export const LocalNotificationSample = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const {showPushNotification} = usePushNotification();
  const showNotification = (isSame: boolean = true, scheduled: boolean = false): void => {
    const date = scheduled ? dayjs().add(10, 'second').toDate() : undefined;
    setCount(count + 1);
    showPushNotification({
      title: 'Local Notification Title',
      message: `${scheduled ? 'Scheduled' : ''} Local notification! ${count}`,
      date,
      extra: 'yeah',
      id: isSame ? 1 : 0,
    });
  };
  return (
    <>
      <Button style={styles.item} onPress={() => showNotification(false)} mode='contained'>
        Show local notification
      </Button>
      <Button style={styles.item} onPress={() => showNotification(true)} mode='contained'>
        Show local notification at same place
      </Button>
      <Button style={styles.item} onPress={() => showNotification(false, true)} mode='contained'>
        Show scheduled local notification after 10 seconds
      </Button>
    </>
  );
};
