import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {SCREEN_NAME} from '@app/app.constants';
import {View, Colors, IconButton} from '@app/core/components';
import {useAuth, SignInType} from '@auth/contexts';
import {styles} from './social-sign-in.styles';

export const SocialSignIn = (): JSX.Element => {
  const [auth, {signInFacebook, signInGoogle, signInApple}] = useAuth();
  const navigation = useNavigation();
  const signIn = async (signInType: SignInType): Promise<void> => {
    if (auth.isSignedIn) {
      return;
    }

    let isSignedIn = false;

    switch (signInType) {
      case 'APPLE':
        isSignedIn = await signInApple();
        break;
      case 'GOOGLE':
        isSignedIn = await signInGoogle();
        break;
      case 'FACEBOOK':
        isSignedIn = await signInFacebook();
        break;
      default:
        return;
    }

    if (isSignedIn) {
      navigation.navigate(SCREEN_NAME.MAIN_TABS);
    }
  };
  return (
    <View style={styles.container}>
      <IconButton icon='facebook' color={Colors.blue500} size={40} onPress={() => signIn('FACEBOOK')} />
      <IconButton icon='google' color={Colors.red500} size={40} onPress={() => signIn('GOOGLE')} />
      {Platform.OS === 'ios' && <IconButton icon='apple' size={40} onPress={() => signIn('APPLE')} />}
    </View>
  );
};
