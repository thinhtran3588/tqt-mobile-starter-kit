/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {BlurViewProperties, BlurView} from '@react-native-community/blur';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
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
  const theme = useSelector((state: RootState) => state.theme);
  const {style, blurType = theme.theme, blurAmount = 10, ...other} = props;
  return <BlurView style={[styles.blur, style]} {...other} blurType={blurType} blurAmount={blurAmount} />;
};
