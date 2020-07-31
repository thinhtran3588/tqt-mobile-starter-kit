import React from 'react';
// import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {View, Colors, IconButton} from '@app/core/components';
import {styles} from './social-sign-in.styles';

export const SocialSignIn = (): JSX.Element => {
  const signInFacebook = async (): Promise<void> => {
    // try {
    //   const loginResult = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //   if (loginResult.isCancelled) {
    //     return;
    //   }
    //   const data = await AccessToken.getCurrentAccessToken();
    //   if (!data) {
    //     throw 'Something went wrong obtaining access token';
    //   }
    //   // Create a Firebase credential with the AccessToken
    //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    //   // Sign-in the user with the credential
    //   return auth().signInWithCredential(facebookCredential);
    // } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <IconButton name='facebook' color={Colors.blue500} size={30} onPress={signInFacebook} />
      <IconButton name='google' color={Colors.red500} size={30} onPress={() => {}} />
      <IconButton name='apple' size={30} onPress={() => {}} />
    </View>
  );
};
