import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button, Layout, Text, View} from '@core/components';
import {useAuth} from '@auth/contexts';
import {showNotification} from '@core/helpers';
import {handleError} from '@core/exceptions';
import {useLoading} from '@core/contexts';
import {styles} from './forgot-password.styles';

interface FormData {
  email: string;
}

export const ForgotPassword = (): JSX.Element => {
  const {t} = useTranslation('forgotPassword');
  const navigation = useNavigation();
  const [, {sendPasswordResetEmail}] = useAuth();
  const [, setLoading] = useLoading();

  const initialValues: FormData = {
    email: '',
  };

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('invalidEmail')).required(t('common:required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(formValues.email);
      showNotification({message: t('requestHasBeenSent', {email: formValues.email})});
      navigation.goBack();
    } catch (err) {
      handleError(err, t);
    } finally {
      setLoading(false);
    }
  };

  const {handleChange, handleBlur, handleSubmit, values, errors} = useFormik<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Layout header headerBackButton headerTitle={t('forgotPassword')} style={styles.container}>
      <View>
        <Text style={styles.text} type='h6'>
          {t('recoverPassword')}
        </Text>
        <TextInput
          label={t('email')}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          errorMessage={errors.email}
        />
        <Button style={styles.button} onPress={handleSubmit} mode='contained'>
          {t('send')}
        </Button>
      </View>
    </Layout>
  );
};
