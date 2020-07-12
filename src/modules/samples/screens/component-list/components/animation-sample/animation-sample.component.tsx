import React from 'react';
import LottieView from 'lottie-react-native';
import * as loading from './loading.json';

export const AnimationSample = (): JSX.Element => {
  const size = {
    width: 50,
    height: 50,
  };
  return <LottieView source={loading} autoPlay loop style={{width: size.width, height: size.height}} />;
};
