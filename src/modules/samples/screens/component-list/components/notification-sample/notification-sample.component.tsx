import React from 'react';
import {Button} from '@core/components';
import {useNotification} from '@core/hooks';
import {styles} from './notification-sample.styles';

export const NotificationSample = (): JSX.Element => {
  const {showNotification} = useNotification();
  return (
    <>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'INFO message', type: 'INFO'})}
        mode='contained'>
        Show info message
      </Button>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'SUCCESS message', type: 'SUCCESS'})}
        mode='contained'>
        Show success message
      </Button>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'WARNING message', type: 'WARNING'})}
        mode='contained'>
        Show warning message
      </Button>
      <Button
        style={[styles.item, styles.lastRow]}
        onPress={() => showNotification({message: 'ERROR message', type: 'ERROR'})}
        mode='contained'>
        Show error message
      </Button>
    </>
  );
};
