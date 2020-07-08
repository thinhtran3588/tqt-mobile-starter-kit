import React from 'react';
import {View, Avatar, Colors} from '@core/components';
import AppIcon from '@assets/images/app-icon-128.png';
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
