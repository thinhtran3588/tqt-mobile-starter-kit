import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '@auth/contexts';
import {ListItem, View, Divider} from '@core/components';
import {styles} from './sign-out.styles';

export const SignOut = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [auth, {signOut}] = useAuth();
  return (
    <>
      {auth.isSignedIn && (
        <View style={styles.container}>
          <Divider />
          <ListItem
            testID='sign-out-list-item'
            title={t('signOut')}
            leftIcon='logout'
            rightIcon='chevron-right'
            onPress={signOut}
          />
        </View>
      )}
    </>
  );
};
