import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {Dispatch} from '@app/stores';
import {SCREEN_NAME} from '@app/app.constants';
import {View, Colors, IconButton} from '@core/components';
import {useAuth, SignInType} from '@auth/contexts';
import {styles} from './social-sign-in.styles';

export const SocialSignIn = (): JSX.Element => {
  const {
    auth,
    dispatch: {signInFacebook, signInGoogle, signInApple},
  } = useAuth();
  const navigation = useNavigation();
  const {
    loading: {setLoading},
    signIn: {clearSignInForm},
  } = useDispatch<Dispatch>();

  const signIn = async (signInType: SignInType): Promise<void> => {
    if (auth.isSignedIn) {
      return;
    }
    setLoading(true);
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
      clearSignInForm();
      setTimeout(() => navigation.navigate(SCREEN_NAME.MAIN_TABS), 100);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <IconButton icon='facebook' color={Colors.blue500} size={40} onPress={() => signIn('FACEBOOK')} />
      <IconButton icon='google' color={Colors.red500} size={40} onPress={() => signIn('GOOGLE')} />
      {Platform.OS === 'ios' && <IconButton icon='apple' size={40} onPress={() => signIn('APPLE')} />}
    </View>
  );
};
