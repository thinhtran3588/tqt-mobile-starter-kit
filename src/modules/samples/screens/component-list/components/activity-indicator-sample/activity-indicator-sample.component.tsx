import React from 'react';
import {ActivityIndicator, Colors, View} from '@app/core';
import {styles} from './activity-indicator-sample.styles';

export const ActivityIndicatorSample = (): JSX.Element => {
  return (
    <View row>
      <ActivityIndicator style={styles.item} />
      <ActivityIndicator color={Colors.amber500} style={styles.item} />
      <ActivityIndicator color={Colors.blue500} style={styles.item} />
      <ActivityIndicator color={Colors.blueGrey500} style={styles.item} />
    </View>
  );
};
