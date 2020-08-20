import React from 'react';
import {View, Badge} from '@app/core';
import {styles} from './badge-sample.styles';

export const BadgeSample = (): JSX.Element => {
  return (
    <View row>
      <Badge key='badge-1' style={styles.item} visible>
        10
      </Badge>
      <Badge key='badge-2' style={styles.item} size={40} visible>
        10
      </Badge>
    </View>
  );
};
