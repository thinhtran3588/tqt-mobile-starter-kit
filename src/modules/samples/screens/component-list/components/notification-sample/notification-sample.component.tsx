import React from 'react';
import {useSelector} from 'react-redux';
import {Button, useNotification} from '@app/core';
import {RootState} from '@app/stores';
import {styles} from './notification-sample.styles';

export const NotificationSample = (): JSX.Element => {
  const {showNotification} = useNotification();
  const theme = useSelector((state: RootState) => state.settings.theme);
  return (
    <>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'INFO message', type: 'INFO'})}
        color={theme.colors.info}
        mode='contained'>
        Show info message
      </Button>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'SUCCESS message', type: 'SUCCESS'})}
        color={theme.colors.success}
        mode='contained'>
        Show success message
      </Button>
      <Button
        style={styles.item}
        onPress={() => showNotification({message: 'WARNING message', type: 'WARNING'})}
        color={theme.colors.warning}
        mode='contained'>
        Show warning message
      </Button>
      <Button
        style={[styles.item, styles.lastRow]}
        onPress={() => showNotification({message: 'ERROR message', type: 'ERROR'})}
        color={theme.colors.error}
        mode='contained'>
        Show error message
      </Button>
    </>
  );
};
