/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Button as RNButton} from 'react-native-paper';
import {styles} from './button.styles';

const Button = (props: React.ComponentProps<typeof RNButton>): JSX.Element => {
  const {style, uppercase = false, ...other} = props;
  return <RNButton style={[styles.button, style]} uppercase={uppercase} {...other} />;
};
export {Button};
