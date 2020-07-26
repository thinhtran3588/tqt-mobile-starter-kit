import React from 'react';
import {Card, Text, Colors, Button, Alert} from '@core/components';
import {styles} from './card-sample.styles';

export const CardSample = (): JSX.Element => {
  const pressButton = (button: string): void => {
    Alert.alert('Alert', `Press ${button} button`);
  };
  return (
    <Card key='card-sample' style={styles.card} elevation={8}>
      <Card.Title
        title='CardSample'
        style={[styles.borderTop, {backgroundColor: Colors.cyan500}]}
        titleStyle={styles.cardTitleText}
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
