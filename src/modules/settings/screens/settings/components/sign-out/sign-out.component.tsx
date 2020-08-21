import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
import {ListItem, View, Divider} from '@app/core';
import {useAuth} from '@auth/contexts';
import {styles} from './sign-out.styles';

export const SignOut = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const {
    dispatch: {signOut},
  } = useAuth();
  return (
    <>
      {isSignedIn && (
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
