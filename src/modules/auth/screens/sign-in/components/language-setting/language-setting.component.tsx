import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {SCREEN_NAME} from '@app/app.constants';
import {View, Colors, IconButton} from '@app/core/components';
import {useAuth, SignInType} from '@auth/contexts';
import {styles} from './language-setting.styles';

export const LanguageSetting = (): JSX.Element => {
  const [auth, {signInFacebook, signInGoogle, signInApple}] = useAuth();
  const navigation = useNavigation();
  const signIn = async (signInType: SignInType): Promise<void> => {};
  return (
    <View style={styles.container}>
      <Button onPress={navigateToMainApp} uppercase={false}>
        {t('skipSignIn')}
      </Button>
    </View>
  );
};
