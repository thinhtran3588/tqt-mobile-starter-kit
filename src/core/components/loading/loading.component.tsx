import React from 'react';
import LottieView from 'lottie-react-native';
import * as loading from './loading.json';

export interface LoadingProps {
  size?: number;
  /** Lottie animation source */
  source?: never;
}

export const Loading = (props: LoadingProps): JSX.Element => {
  const {size = 150, source = loading} = props;
  return <LottieView source={source} autoPlay loop style={{width: size, height: size}} />;
};
