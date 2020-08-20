import React, {useState} from 'react';
import {Button, Menu, Divider, View, useDimensions} from '@app/core';
import {styles} from './menu-sample.styles';

export const MenuSample = (): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const {screen} = useDimensions();
  return (
    <>
      <Button onPress={() => setVisible(true)}>Show menu</Button>
      <Menu
        style={{width: screen.width - 80}}
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<View style={styles.menuAnchor} />}>
        <Menu.Item onPress={() => {}} title='Item 1' />
        <Menu.Item onPress={() => {}} title='Item 2' />
        <Divider />
        <Menu.Item onPress={() => {}} title='Item 3' />
      </Menu>
    </>
  );
};
