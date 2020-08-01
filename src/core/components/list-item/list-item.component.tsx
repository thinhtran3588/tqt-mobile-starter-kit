/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {List, Switch, Divider} from 'react-native-paper';
import {styles} from './list-item.styles';
import {View} from '../view/view.component';

export type ListItemProps = React.ComponentProps<typeof List.Item> & {
  switchRight?: boolean;
  switchRightValue?: boolean;
  switchRightOnValueChange?: (value: boolean) => void;
  switchRightDisabled?: boolean;
  switchRightTestID?: string;
  leftIcon?: string;
  rightIcon?: string;
  divider?: boolean;
};

type LeftComponent = (props: {
  color: string;
  style: {
    marginLeft: number;
    marginRight: number;
    marginVertical?: number;
  };
}) => React.ReactNode;

type RightComponent = (props: {
  color: string;
  style?: {
    marginRight: number;
    marginVertical?: number;
  };
}) => React.ReactNode;

export const ListItem = (props: ListItemProps): JSX.Element => {
  const {
    style,
    titleStyle,
    switchRight,
    switchRightValue,
    switchRightOnValueChange,
    switchRightDisabled,
    switchRightTestID,
    left,
    right,
    leftIcon,
    rightIcon,
    divider = true,
    ...other
  } = props;

  let LeftComponent: LeftComponent | undefined = left;
  let RightComponent: RightComponent | undefined = right;
  if (leftIcon) {
    LeftComponent = () => <List.Icon icon={leftIcon} />;
  }
  if (switchRight) {
    RightComponent = () => (
      <View style={styles.switchContainer}>
        <Switch
          value={switchRightValue}
          onValueChange={switchRightOnValueChange}
          disabled={switchRightDisabled}
          testID={switchRightTestID}
        />
      </View>
    );
  } else if (rightIcon) {
    RightComponent = () => <List.Icon icon={rightIcon} />;
  }

  return (
    <>
      <List.Item
        style={[styles.listItem, style]}
        titleStyle={[styles.title, titleStyle]}
        left={LeftComponent}
        right={RightComponent}
        {...other}
      />
      {divider && <Divider />}
    </>
  );
};
