import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {View, TextInput, Button} from '@core/components';
import {useForm} from '@core/hooks';
import {useAuth, useSignInToggleClearForm} from '@auth/contexts';
import {SCREEN_NAME} from '@app/app.constants';
import {styles} from './email-sign-in.styles';

interface FormData {
  email: string;
  password: string;
}

export const EmailSignIn = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const [, {signInEmail}] = useAuth();
  const [toggleClearForm, setToggleClearForm] = useSignInToggleClearForm();

  const initialValues: FormData = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common:invalid')).required(t('common:required')),
    password: Yup.string().required(t('common:required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    const {email, password} = formValues;
    const isSignedIn = await signInEmail({
      email,
      password,
    });
    if (isSignedIn) {
      setToggleClearForm(!toggleClearForm);
      setTimeout(() => navigation.navigate(SCREEN_NAME.MAIN_TABS), 100);
    }
  };

  const {handleChange, handleBlur, values, errors, setValues, submitForm} = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    setValues(initialValues, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleClearForm]);

  return (
    <View>
      <TextInput
        label={t('email')}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
        errorMessage={errors.email}
      />
      <TextInput
        label={t('password')}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        secureTextEntry
        errorMessage={errors.password}
      />
      <Button style={styles.button} onPress={submitForm} mode='contained'>
        {t('signIn')}
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate(SCREEN_NAME.SIGN_IN_PHONE_NO)} mode='contained'>
        {t('signInWithPhoneNo')}
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate(SCREEN_NAME.FORGOT_PASSWORD)}>
        {t('forgotPassword')}
      </Button>
    </View>
  );
};
