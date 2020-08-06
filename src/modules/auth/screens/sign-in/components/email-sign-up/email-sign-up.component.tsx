import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button} from '@core/components';
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

  const {handleChange, handleBlur, values, errors, setValues, submitForm} = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    setValues(initialValues, false);
  }, [initialValues, setValues, toggleClearSignInForm]);

  return (
    <>
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
      <TextInput
        label={t('passwordConfirmation')}
        onChangeText={handleChange('passwordConfirmation')}
        onBlur={handleBlur('passwordConfirmation')}
        value={values.passwordConfirmation}
        secureTextEntry
        errorMessage={errors.passwordConfirmation}
      />
      <Button style={styles.button} onPress={submitForm} mode='contained'>
        {t('signUp')}
      </Button>
    </>
  );
};
