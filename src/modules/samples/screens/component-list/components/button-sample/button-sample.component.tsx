import React from 'react';
import {Button, Alert} from '@core/components';
import {styles} from './button-sample.styles';

export const ButtonSample = (): JSX.Element => {
  const onPress = (): void => Alert.alert('Press me', 'Pressed');
  return (
    <>
      <Button testID='button-sample' style={styles.item} onPress={onPress}>
        Press me
      </Button>
      <Button style={styles.item} icon='camera' onPress={onPress}>
        Press me
      </Button>
      <Button style={styles.item} onPress={onPress} loading>
        Press me
      </Button>
      <Button style={styles.item} onPress={onPress} mode='outlined'>
        Press me
      </Button>
      <Button style={styles.item} icon='camera' onPress={onPress} mode='outlined'>
        Press me
      </Button>
      <Button style={styles.item} onPress={onPress} loading mode='outlined'>
        Press me
      </Button>
      <Button style={styles.item} onPress={onPress} mode='contained'>
        Press me
      </Button>
      <Button style={styles.item} icon='camera' onPress={onPress} mode='contained'>
        Press me
      </Button>
      <Button style={styles.item} onPress={onPress} loading mode='contained'>
        Press me
      </Button>
    </>
  );
};
