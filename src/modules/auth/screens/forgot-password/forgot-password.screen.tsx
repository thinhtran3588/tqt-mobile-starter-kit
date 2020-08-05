import React from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button, Layout, View} from '@core/components';
import {useAuth} from '@auth/contexts';
import {useForm, useNotification} from '@core/hooks';
import {styles} from './forgot-password.styles';

interface FormData {
  email: string;
}

export const ForgotPasswordScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const [, {sendPasswordResetEmail}] = useAuth();
  const {showNotification} = useNotification();

  const initialValues: FormData = {
    email: '',
  };

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common:invalid')).required(t('common:required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    await sendPasswordResetEmail(formValues.email);
    showNotification({message: t('requestHasBeenSent', {email: formValues.email})});
    navigation.goBack();
  };

  const {handleChange, handleBlur, values, errors, submitForm} = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Layout header headerBackButton headerTitle={t('recoverPassword')} style={styles.container}>
      <View>
        <TextInput
          label={t('email')}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          errorMessage={errors.email}
        />
        <Button style={styles.button} onPress={submitForm} mode='contained'>
          {t('send')}
        </Button>
      </View>
    </Layout>
  );
};
