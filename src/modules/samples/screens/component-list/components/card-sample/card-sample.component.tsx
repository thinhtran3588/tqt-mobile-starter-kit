import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
import {Card, Text, Button, Alert} from '@core/components';
import {DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@core/constants';
import {styles} from './card-sample.styles';

export const CardSample = (): JSX.Element => {
  const theme = useSelector((state: RootState) => state.theme);
  const textColor = theme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const pressButton = (button: string): void => {
    Alert.alert('Alert', `Press ${button} button`);
  };
  return (
    <Card key='card-sample' style={styles.card} elevation={8}>
      <Card.Title
        title='CardSample'
        style={[styles.borderTop, {backgroundColor: theme.colors.primary}]}
        titleStyle={{color: textColor}}
      />
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      <Card.Content style={styles.cardContent}>
        <Text type='h2'>Title</Text>
        <Text type='p'>Content</Text>
      </Card.Content>
      <Card.Actions style={styles.borderBottom}>
        <Button testID='cancel-button' onPress={() => pressButton('Cancel')}>
          Cancel
        </Button>
        <Button testID='ok-button' onPress={() => pressButton('OK')}>
          Ok
        </Button>
      </Card.Actions>
    </Card>
  );
};
