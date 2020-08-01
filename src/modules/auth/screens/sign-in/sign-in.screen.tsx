import React from 'react';
import {Layout, Image, Button, View} from '@app/core/components';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Logo from '@assets/images/app-logo.png';
import {SCREEN_NAME} from '@app/app.constants';
import {SocialSignIn} from './components';
import {styles} from './sign-in.styles';

export const SignInScreen = (): JSX.Element => {
  const {t} = useTranslation('signIn');
  const navigation = useNavigation();

  const navigateToMainApp = (): void => {
    navigation.navigate(SCREEN_NAME.MAIN_TABS);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} />
        <SocialSignIn />
        <Button onPress={navigateToMainApp} uppercase={false}>
          {t('skipSignIn')}
        </Button>
      </View>
    </Layout>
  );
};
