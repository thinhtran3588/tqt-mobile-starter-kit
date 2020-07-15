import React from 'react';
import {View, Icon, Colors} from '@core/components';
import {styles} from './icon-sample.styles';

export const IconSample = (): JSX.Element => {
  return (
    <View row>
      <Icon style={styles.item} name='home' size={40} />
      <Icon style={styles.item} name='home' size={40} color={Colors.amber500} />
    </View>
  );
};
