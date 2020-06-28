import React from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// eslint-disable-next-line import/no-unresolved
import {IconProps as VectorIconProps} from 'react-native-vector-icons/Icon';

export interface IconProps extends VectorIconProps {}
export const Icon = (props: IconProps): JSX.Element => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MCIcon {...props} />;
};
