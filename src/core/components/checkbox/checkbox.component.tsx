/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ListItemProps, ListItem} from '../list-item/list-item.component';

export type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';
export type CheckboxProps = ListItemProps & {
  status: CheckboxStatus;
};

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {status, ...other} = props;
  let leftIcon = 'checkbox-blank-outline';
  if (status === 'checked') {
    leftIcon = 'checkbox-marked';
  } else if (status === 'indeterminate') {
    leftIcon = 'checkbox-intermediate';
  }
  return <ListItem leftIcon={leftIcon || other.leftIcon} {...other} />;
};
