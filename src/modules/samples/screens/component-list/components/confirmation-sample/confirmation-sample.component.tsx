import React from 'react';
import {Button} from '@core/components';
import {useNotification} from '@core/hooks';
import {useConfirmation, ColorType, ConfirmationButton, useAppTheme} from '@core/contexts';
import {styles} from './confirmation-sample.styles';

export const ConfirmationSample = (): JSX.Element => {
  const {showNotification} = useNotification();
  const {appTheme} = useAppTheme();
  const message = 'Do you want to proceed?';
  const getButtons = (type: ColorType): ConfirmationButton[] => {
    return [
      {
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        type,
        onPress: () => showNotification({message: 'You pressed Confirm'}),
      },
    ];
  };
  const {
    dispatch: {openConfirmation},
  } = useConfirmation();
  return (
    <>
      <Button
        style={styles.item}
        onPress={() => openConfirmation({message, buttons: getButtons('PRIMARY'), showTitle: false})}
        mode='contained'>
        Show without title
      </Button>
      <Button
        style={styles.item}
        onPress={() => openConfirmation({message, buttons: getButtons('INFO'), titleType: 'INFO'})}
        color={appTheme.colors.info}
        mode='contained'>
        Show info
      </Button>
      <Button
        style={styles.item}
        onPress={() => openConfirmation({message, buttons: getButtons('SUCCESS'), titleType: 'SUCCESS'})}
        color={appTheme.colors.success}
        mode='contained'>
        Show success
      </Button>
      <Button
        style={styles.item}
        onPress={() => openConfirmation({message, buttons: getButtons('WARNING'), titleType: 'WARNING'})}
        color={appTheme.colors.warning}
        mode='contained'>
        Show warning
      </Button>
      <Button
        style={[styles.item, styles.lastRow]}
        onPress={() => openConfirmation({message, buttons: getButtons('ERROR'), titleType: 'ERROR'})}
        color={appTheme.colors.error}
        mode='contained'>
        Show error
      </Button>
    </>
  );
};
