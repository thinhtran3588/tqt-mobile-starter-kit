import React, {useEffect} from 'react';
import {useImmer} from 'use-immer';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button, Layout, View} from '@core/components';
import {useAuth} from '@auth/contexts';
import {config} from '@core/config';
import {SCREEN_NAME} from '@app/app.constants';
import {useLoading} from '@core/contexts';
import {useForm} from '@core/hooks';
import {styles} from './sign-in-phone-no.styles';

interface FormData {
  countryCode: string;
  phoneNo: string;
}

interface VerificationStatus {
  codeSent: boolean;
  waitTime: number;
  phoneNo: string;
}

export const SignInPhoneNoScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const {
    auth,
    dispatch: {sendPhoneNoVerificationCode, verifyCode},
  } = useAuth();
  const {setLoading} = useLoading();
  const [verificationStatus, setVerificationStatus] = useImmer<VerificationStatus>({
    codeSent: false,
    waitTime: 0,
    phoneNo: '',
  });
  let intervalCountSendTime: NodeJS.Timeout;

  useEffect(() => {
    if (auth.isSignedIn) {
      navigation.goBack();
      navigation.navigate(SCREEN_NAME.MAIN_TABS);
    }
  }, [auth.isSignedIn, navigation]);

  useEffect(() => {
    return () => {
      if (intervalCountSendTime) {
        clearInterval(intervalCountSendTime);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: FormData = {
    countryCode: config().defaultCountryCode,
    phoneNo: '',
  };

  const validationSchema = Yup.object().shape<FormData>({
    countryCode: Yup.string().required(t('common:required')),
    phoneNo: (Yup.number()
      .typeError(t('common:invalid'))
      .integer(t('common:invalid'))
      .min(1, t('common:invalid'))
      .required(t('common:required')) as unknown) as Yup.StringSchema<string>,
  });

  const sendCode = async (formValues: FormData): Promise<void> => {
    const phoneNo = `${formValues.countryCode}${formValues.phoneNo}`;
    await sendPhoneNoVerificationCode(phoneNo);

    setVerificationStatus((draft) => {
      draft.waitTime = 30;
      draft.codeSent = true;
      draft.phoneNo = phoneNo;
    });

    intervalCountSendTime = setInterval(() => {
      setVerificationStatus((draft) => {
        if (draft.waitTime > 0) {
          draft.waitTime -= 1;
          return;
        }
        if (draft.waitTime < 0) {
          draft.waitTime = 0;
        }
        clearInterval(intervalCountSendTime);
      });
    }, 1000);
  };

  const {handleChange, handleBlur, submitForm, values, errors} = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit: sendCode,
  });

  const signIn = async (formValues: {code: string}): Promise<void> => {
    setLoading(true);
    await verifyCode(formValues.code);
  };

  const codeForm = useForm<{code: string}>({
    initialValues: {code: ''},
    validationSchema: Yup.object().shape({
      code: Yup.string().required(t('common:required')),
    }),
    onSubmit: signIn,
  });

  return (
    <Layout header headerBackButton headerTitle={t('signInWithPhoneNo')} style={styles.container}>
      <View row>
        <View flex={2}>
          <TextInput
            label={' '}
            value={values.countryCode}
            errorMessage={errors.countryCode}
            keyboardType='number-pad'
            disabled={verificationStatus.codeSent}
          />
        </View>
        <View flex={9}>
          <TextInput
            label={t('phoneNo')}
            onChangeText={handleChange('phoneNo')}
            onBlur={handleBlur('phoneNo')}
            value={values.phoneNo}
            errorMessage={errors.phoneNo}
            keyboardType='number-pad'
            disabled={verificationStatus.codeSent}
          />
        </View>
      </View>
      <Button style={styles.button} onPress={submitForm} mode='contained' disabled={verificationStatus.waitTime !== 0}>
        {`${t('sendVerificationCode')}${verificationStatus.waitTime !== 0 ? `(${verificationStatus.waitTime})` : ''}`}
      </Button>
      {verificationStatus.codeSent && (
        <>
          <TextInput
            label={t('verificationCode')}
            onChangeText={codeForm.handleChange('code')}
            onBlur={codeForm.handleBlur('code')}
            value={codeForm.values.code}
            errorMessage={codeForm.errors.code}
            keyboardType='number-pad'
          />
          <Button style={styles.button} onPress={codeForm.submitForm} mode='contained'>
            {t('signIn')}
          </Button>
        </>
      )}
    </Layout>
  );
};
