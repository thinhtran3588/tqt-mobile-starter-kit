import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {View, Button, FormInput, FormField, useForm} from '@app/core';
import {Dispatch, RootState} from '@app/stores';
import {useAuth} from '@auth/contexts';
import {SCREEN_NAME} from '@app/app.constants';
import {styles} from './email-sign-in.styles';

interface FormData {
  email: string;
  password: string;
}

const initialValues: FormData = {
  email: '',
  password: '',
};

export const EmailSignIn = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const {
    dispatch: {signInEmail},
  } = useAuth();
  const toggleClearForm = useSelector((state: RootState) => state.signIn.toggleClearForm);
  const {
    signIn: {clearSignInForm},
  } = useDispatch<Dispatch>();
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
  }, [setValues, toggleClearForm]);

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
