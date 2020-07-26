import React from 'react';
import {Surface} from 'react-native-paper';
import {styles} from './layout.styles';

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const {children} = props;
  return <Surface style={styles.root}>{children}</Surface>;
};
