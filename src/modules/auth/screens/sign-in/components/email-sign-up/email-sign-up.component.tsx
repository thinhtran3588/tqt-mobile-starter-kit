import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Button, FormInput, FormField} from '@core/components';
import {useAuth, useClearSignInForm} from '@auth/contexts';
import {SCREEN_NAME} from '@app/app.constants';
import {useForm} from '@core/hooks';
import {styles} from './email-sign-up.styles';

interface FormData {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export const EmailSignUp = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const {
    dispatch: {signUpEmail},
  } = useAuth();
  const {toggleClearSignInForm, clearSignInForm} = useClearSignInForm();

  const [initialValues] = useState<FormData>({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common:invalid')).required(t('common:required')),
    password: Yup.string()
      .required(t('common:required'))
      .min(8, t('passwordMinLengthRequired', {minLength: 8}))
      .matches(/(?=.*?[A-Z])/, t('passwordUpperCaseRequired'))
      .matches(/(?=.*?[a-z])/, t('passwordLowerCaseRequired'))
      .matches(/(?=.*?[0-9])/, t('passwordDigitRequired'))
      .matches(/(?=.*?[#?!@$%^&*-])/, t('passwordSpecialCharacterRequired')),
    passwordConfirmation: Yup.string()
      .required(t('common:required'))
      .oneOf([Yup.ref('password')], t('passwordMustMatch')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    const {email, password} = formValues;
    const isSignedIn = await signUpEmail({
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
    {
      name: 'passwordConfirmation',
      type: 'text',
      secureTextEntry: true,
    },
  ];

  useEffect(() => {
    setValues(initialValues, false);
  }, [initialValues, setValues, toggleClearSignInForm]);

  return (
    <>
      {fields.map((field, index) => (
        <FormInput key={index.toString()} form={form} t={t} field={field} />
      ))}
      <Button style={styles.button} onPress={submitForm} mode='contained'>
        {t('signUp')}
      </Button>
    </>
  );
};
