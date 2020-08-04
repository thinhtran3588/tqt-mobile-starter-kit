import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {View, TextInput, Button} from '@core/components';
import {useLoading} from '@core/contexts';
import {useAuth, useSignInToggleClearForm} from '@auth/contexts';
import {handleError} from '@core/exceptions';
import {SCREEN_NAME} from '@app/app.constants';
import {styles} from './email-sign-in.styles';

interface FormData {
  email: string;
  password: string;
}

export const EmailSignIn = (): JSX.Element => {
  const {t} = useTranslation('signIn');
  const navigation = useNavigation();
  const [, {signInEmail}] = useAuth();
  const [, setLoading] = useLoading();
  const [toggleClearForm, setToggleClearForm] = useSignInToggleClearForm();

  const initialValues: FormData = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('invalidEmail')).required(t('common:required')),
    password: Yup.string().required(t('common:required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    try {
      setLoading(true);
      const isSignedIn = await signInEmail({
        email: formValues.email,
        password: formValues.password,
      });
      if (isSignedIn) {
        setToggleClearForm(!toggleClearForm);
        navigation.navigate(SCREEN_NAME.MAIN_TABS);
      }
    } catch (err) {
      handleError(err, t);
    } finally {
      setLoading(false);
    }
  };

  const {handleChange, handleBlur, handleSubmit, values, errors, setValues} = useFormik<FormData>({
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
      <Button style={styles.button} onPress={handleSubmit} mode='contained'>
        {t('signIn')}
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate(SCREEN_NAME.FORGOT_PASSWORD)}>
        {t('forgotPassword')}
      </Button>
    </View>
  );
};
