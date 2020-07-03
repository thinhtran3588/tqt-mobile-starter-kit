import React from 'react';
import {View, Badge} from '@core/components';
import {styles} from './badge.styles';

export const BadgeSample = (): JSX.Element => {
  return (
    <View row>
      <Badge style={styles.item}>10</Badge>
      <Badge style={styles.item} size={40}>
        10
      </Badge>
    </View>
  );
};
