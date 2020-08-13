import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {View, Button, FormInput, FormField} from '@core/components';
import {useForm} from '@core/hooks';
import {useAuth, useClearSignInForm} from '@auth/contexts';
import {SCREEN_NAME} from '@app/app.constants';
import {styles} from './email-sign-in.styles';

interface FormData {
  email: string;
  password: string;
}

export const EmailSignIn = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const {
    dispatch: {signInEmail},
  } = useAuth();
  const {toggleClearSignInForm, clearSignInForm} = useClearSignInForm();
  const [initialValues] = useState<FormData>({
    email: '',
    password: '',
  });
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
      clearSignInForm();
      setTimeout(() => navigation.navigate(SCREEN_NAME.MAIN_TABS), 100);
    }
  };
  const form = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {setValues, submitForm} = form;
  const fields: FormField<FormData>[] = [
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'password',
      type: 'text',
      secureTextEntry: true,
    },
  ];

  useEffect(() => {
    setValues(initialValues, false);
  }, [toggleClearSignInForm, setValues, initialValues]);

  return (
    <View>
      {fields.map((field, index) => (
        <FormInput key={index.toString()} form={form} t={t} field={field} />
      ))}
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
