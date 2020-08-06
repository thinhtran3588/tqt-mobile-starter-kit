/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export type IconProps = React.ComponentProps<typeof MCIcon>;
export const Icon = (props: IconProps): JSX.Element => {
  return <MCIcon {...props} />;
};
