import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {View, TextInput, Button} from '@app/core/components';
import {useLoading} from '@app/core/contexts';
import {useAuth} from '@auth/contexts';
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

  const initialValues: FormData = {email: '', password: ''};

  const validationSchema = Yup.object().shape<typeof initialValues>({
    email: Yup.string().email(t('invalidEmail')).required(t('common:required')),
    password: Yup.string().required(t('common:required')),
  });

  const onSubmit = async (values: typeof initialValues): Promise<void> => {
    try {
      setLoading(true);
      const isSignedIn = await signInEmail({
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
            error={errors.email}
          />
          <TextInput
            label={t('password')}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            error={errors.password}
          />
          <Button style={styles.button} onPress={handleSubmit} mode='contained'>
            {t('signIn')}
          </Button>
          <Button style={styles.button} onPress={() => {}}>
            {t('forgotPassword')}
          </Button>
        </View>
      )}
    </Formik>
  );
};
