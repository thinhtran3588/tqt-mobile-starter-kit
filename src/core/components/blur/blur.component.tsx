/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {BlurViewProperties, BlurView} from '@react-native-community/blur';
import {useAppTheme} from '@core/contexts';
import {styles} from './blur.styles';

export type BlueProps = Omit<BlurViewProperties, 'blurType'> & {
  blurType?:
    | 'xlight'
    | 'light'
    | 'dark'
    // tvOS and iOS 10+ only
    | 'regular'
    | 'prominent'
    // tvOS only
    | 'extraDark';
};
export const Blur = (props: BlueProps): JSX.Element => {
  const {appTheme} = useAppTheme();
  const {style, blurType = appTheme.theme, blurAmount = 10, ...other} = props;
  return <BlurView style={[styles.blur, style]} {...other} blurType={blurType} blurAmount={blurAmount} />;
};
