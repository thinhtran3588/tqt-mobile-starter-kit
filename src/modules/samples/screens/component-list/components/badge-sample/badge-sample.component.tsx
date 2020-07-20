import React from 'react';
import {View, Badge} from '@core/components';
import {styles} from './badge-sample.styles';

export const BadgeSample = (): JSX.Element => {
  return (
    <View row>
      <Badge style={styles.item} visible>
        10
      </Badge>
      <Badge style={styles.item} size={40} visible>
        10
      </Badge>
    </View>
  );
};
