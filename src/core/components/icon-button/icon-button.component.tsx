/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Pressable} from 'react-native';
import {IconProps, Icon} from '../icon/icon.component';
import {styles} from './icon-button.styles';

export const IconButton = (props: IconProps): JSX.Element => {
  const {onPress, onLongPress, style, color, ...other} = props;
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} android_ripple={{color, borderless: true}}>
      <Icon {...other} style={[styles.icon, style]} color={color} />
    </Pressable>
  );
};
