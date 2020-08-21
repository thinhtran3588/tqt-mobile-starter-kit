import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
import {SCREEN_NAME} from '@app/app.constants';
import {useNavigation} from '@react-navigation/native';
import {View, Divider, Button, Avatar, Text} from '@app/core';
import {styles} from './profile.styles';

export const Profile = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const navigation = useNavigation();
  const auth = useSelector((state: RootState) => state.auth);

  const signIn = (): void => {
    navigation.navigate(SCREEN_NAME.SIGN_IN);
  };

  return (
    <View style={styles.container}>
      {!auth.avatarUrl && <Avatar.Icon icon='face' size={120} color='#fff' />}
      {Boolean(auth.avatarUrl) && <Avatar.Image style={{}} source={{uri: auth.avatarUrl}} size={120} />}
      <Text style={styles.name} type='h5'>
        {auth.displayName}
      </Text>
      {!auth.isSignedIn && (
        <Button onPress={signIn} mode='contained'>
          {t('signIn')}
        </Button>
      )}
      <Divider />
    </View>
  );
};
