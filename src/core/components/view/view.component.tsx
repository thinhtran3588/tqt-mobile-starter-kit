/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View as RNView, ViewProps as RNViewProps} from 'react-native';
import {styles} from './view.styles';

export type ViewProps = RNViewProps & {
  children?: React.ReactNode;
  row?: boolean;
  flex?: number;
};

export const View = (props: ViewProps): JSX.Element => {
  const {children, row, style, flex, ...other} = props;

  return (
    <RNView style={[row ? styles.row : {}, flex ? {flex} : {}, style]} {...other}>
      {children}
    </RNView>
  );
};
