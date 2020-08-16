import React, {useState} from 'react';
import {Button, Confirmation, ConfirmationButton} from '@core/components';
import {useNotification} from '@core/hooks';
import {ColorType, useAppTheme} from '@core/contexts';
import {styles} from './confirmation-sample.styles';

export const ConfirmationSample = (): JSX.Element => {
  const {showNotification} = useNotification();
  const {appTheme} = useAppTheme();
  const [open, setOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [type, setType] = useState<ColorType>('INFO');
  const getButtons = (): ConfirmationButton[] => {
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
  const showConfirmation = (colorType: ColorType = 'INFO', showConfirmationTitle: boolean = true): void => {
    setType(colorType);
    setShowTitle(showConfirmationTitle);
    setOpen(true);
  };

  return (
    <>
      <Button style={styles.item} onPress={() => showConfirmation('INFO', false)} mode='contained'>
        Show without title
      </Button>
      <Button
        style={styles.item}
        onPress={() => showConfirmation('INFO', true)}
        color={appTheme.colors.info}
        mode='contained'>
        Show info
      </Button>
      <Button
        style={styles.item}
        onPress={() => showConfirmation('SUCCESS', true)}
        color={appTheme.colors.success}
        mode='contained'>
        Show success
      </Button>
      <Button
        style={styles.item}
        onPress={() => showConfirmation('WARNING', true)}
        color={appTheme.colors.warning}
        mode='contained'>
        Show warning
      </Button>
      <Button
        style={[styles.item, styles.lastRow]}
        onPress={() => showConfirmation('ERROR', true)}
        color={appTheme.colors.error}
        mode='contained'>
        Show error
      </Button>
      <Confirmation
        message='Do you want to proceed?'
        open={open}
        onClose={() => setOpen(false)}
        buttons={getButtons()}
        titleType={type}
        showTitle={showTitle}
      />
    </>
  );
};
