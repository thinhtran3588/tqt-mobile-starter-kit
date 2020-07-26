/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {TextProps as RNTextProps, StyleProp, TextStyle} from 'react-native';
import {Text as RNText} from 'react-native-paper';
import {styles} from './text.styles';

export type TextProps = RNTextProps & {
  style?: StyleProp<TextStyle>;
  theme?: ReactNativePaper.Theme;
  children?: React.ReactNode;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'p';
  uppercase?: boolean;
  lowercase?: boolean;
};

export const Text = (props: TextProps): JSX.Element => {
  const {children, uppercase, lowercase, type, style, ...other} = props;
  let childrenNode = children;
  if (typeof children === 'string') {
    if (uppercase) {
      childrenNode = children.toUpperCase();
    } else if (lowercase) {
      childrenNode = children.toLowerCase();
    }
  }
  return (
    <RNText style={[style, styles[type || 'p']]} {...other}>
      {childrenNode}
    </RNText>
  );
};
