import React from 'react';
import {View} from 'react-native';
import {styles} from './loading-screen.styles';
import {Loading} from '../loading/loading.component';

export interface LoadingScreenProps {
  backgroundColor?: string;
}

export const LoadingScreen = (props: LoadingScreenProps): JSX.Element => {
  const {backgroundColor} = props;
  return (
    <View style={[styles.default, {backgroundColor}]}>
      <Loading />
    </View>
  );
};
