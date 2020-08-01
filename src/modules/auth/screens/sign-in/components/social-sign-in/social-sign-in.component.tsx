import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from '@app/app.constants';
import {View, Colors, IconButton} from '@app/core/components';
import {useAuth, SignInType} from '@auth/contexts';
import {styles} from './social-sign-in.styles';

export const SocialSignIn = (): JSX.Element => {
  const [auth, {signInFacebook}] = useAuth();
  const navigation = useNavigation();
  const signIn = async (signInType: SignInType): Promise<void> => {
    if (auth.isSignedIn) {
      return;
    }

    switch (signInType) {
      case 'APPLE':
        break;
      case 'GOOGLE':
        break;
      case 'FACEBOOK':
        await signInFacebook();
        break;
      default:
        return;
    }
    navigation.navigate(SCREEN_NAME.MAIN_TABS);
  };
  return (
    <View style={styles.container}>
      <IconButton name='facebook' color={Colors.blue500} size={30} onPress={() => signIn('FACEBOOK')} />
      <IconButton name='google' color={Colors.red500} size={30} onPress={() => signIn('GOOGLE')} />
      <IconButton name='apple' size={30} onPress={() => signIn('APPLE')} />
    </View>
  );
};
