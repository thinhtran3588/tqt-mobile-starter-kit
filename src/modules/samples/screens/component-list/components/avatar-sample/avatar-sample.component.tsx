import React from 'react';
import AppIcon from '@app/assets/images/app-icon.png';
import {View, Avatar, Colors} from '@app/core';
import {styles} from './avatar-sample.styles';

export const AvatarSample = (): JSX.Element => {
  return (
    <>
      <View row>
        <Avatar.Icon style={styles.item} icon='home' size={40} />
        <Avatar.Icon
          style={styles.item}
          icon='home'
          size={40}
          color='#fff'
          theme={{colors: {primary: Colors.cyan500}}}
        />
        <Avatar.Text style={styles.item} label='AT' size={40} />
        <Avatar.Text
          style={styles.item}
          label='AT'
          size={40}
          color='#fff'
          theme={{colors: {primary: Colors.cyan500}}}
        />
        <Avatar.Image style={styles.item} source={AppIcon} size={40} />
      </View>
    </>
  );
};
