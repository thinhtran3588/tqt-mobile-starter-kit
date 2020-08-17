/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {TextStyle} from 'react-native';
import {Button as RNButton} from 'react-native-paper';
import {useAppTheme, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@core/contexts';
import {styles} from './button.styles';

const Button = (props: React.ComponentProps<typeof RNButton>): JSX.Element => {
  const {style, labelStyle, uppercase = false, ...other} = props;
  const {appTheme} = useAppTheme();
  const labelColorStyle: TextStyle =
    other.mode === 'contained'
      ? {
          color: appTheme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR,
        }
      : {};
  return (
    <RNButton
      style={[styles.button, style]}
      uppercase={uppercase}
      {...other}
      labelStyle={[labelColorStyle, labelStyle]}
      contentStyle={styles.content}
    />
  );
};
export {Button};
