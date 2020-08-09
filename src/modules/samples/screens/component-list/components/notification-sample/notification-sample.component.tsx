import React from 'react';
import {Button} from '@core/components';
import {useNotification} from '@core/hooks';
import {useAppTheme} from '@core/contexts';
import {styles} from './notification-sample.styles';

export const NotificationSample = (): JSX.Element => {
  const {showNotification} = useNotification();
  const {appTheme} = useAppTheme();
  return (
    <>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'INFO message', type: 'INFO'})}
        color={appTheme.colors.info}
        mode='contained'>
        Show info message
      </Button>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'SUCCESS message', type: 'SUCCESS'})}
        color={appTheme.colors.success}
        mode='contained'>
        Show success message
      </Button>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'WARNING message', type: 'WARNING'})}
        color={appTheme.colors.warning}
        mode='contained'>
        Show warning message
      </Button>
      <Button
        style={[styles.item, styles.lastRow]}
        onPress={() => showNotification({message: 'ERROR message', type: 'ERROR'})}
        color={appTheme.colors.error}
        mode='contained'>
        Show error message
      </Button>
    </>
  );
};
