import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {View, TextInput, Button} from '@app/core/components';
import {useAuth} from '@auth/contexts';
import {SCREEN_NAME} from '@app/app.constants';
import {handleError} from '@app/core/exceptions';
import {useLoading} from '@app/core/contexts';
import {styles} from './email-sign-up.styles';

interface FormData {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export const EmailSignUp = (): JSX.Element => {
  const {t} = useTranslation('signIn');
  const navigation = useNavigation();
  const [, {signUpEmail}] = useAuth();
  const [, setLoading] = useLoading();

  const initialValues: FormData = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object().shape<typeof initialValues>({
    email: Yup.string().email(t('invalidEmail')).required(t('common:required')),
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

  const onSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      setLoading(true);
      const isSignedIn = await signUpEmail({
        email: values.email,
        password: values.password,
      });
      if (isSignedIn) {
        navigation.navigate(SCREEN_NAME.MAIN_TABS);
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
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
          <TextInput
            label={t('passwordConfirmation')}
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
            secureTextEntry
            errorMessage={errors.passwordConfirmation}
          />
          <Button style={styles.button} onPress={handleSubmit} mode='contained'>
            {t('signUp')}
          </Button>
        </View>
      )}
    </Formik>
  );
};
