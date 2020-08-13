import React, {useEffect, useState} from 'react';
import {useImmer} from 'use-immer';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import COUNTRIES from '@assets/json/countries.json';
import {Button, Layout, View, PickerDataItem, Menu, FormField, FormInput} from '@core/components';
import {useAuth} from '@auth/contexts';
import {config} from '@core/config';
import {SCREEN_NAME} from '@app/app.constants';
import {useForm, useDimensions} from '@core/hooks';
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

const countries: PickerDataItem[] = COUNTRIES.map((country) => ({value: country.code, label: country.dialCode}));

export const SignInPhoneNoScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const {
    auth,
    dispatch: {sendPhoneNoVerificationCode, verifyCode},
  } = useAuth();
  const [verificationStatus, setVerificationStatus] = useImmer<VerificationStatus>({
    codeSent: false,
    waitTime: 0,
    phoneNo: '',
  });
  const [intervalCountSendTime, setIntervalCountSendTime] = useState<NodeJS.Timeout>();
  const {screen} = useDimensions();

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
  }, [intervalCountSendTime]);

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
    const country = COUNTRIES.find((c) => c.code === formValues.countryCode);
    const phoneNo = `${country?.dialCode}${formValues.phoneNo}`;
    await sendPhoneNoVerificationCode(phoneNo);

    setVerificationStatus((draft) => {
      draft.waitTime = 30;
      draft.codeSent = true;
      draft.phoneNo = phoneNo;
    });

    setIntervalCountSendTime(
      setInterval(() => {
        setVerificationStatus((draft) => {
          if (draft.waitTime > 0) {
            draft.waitTime -= 1;
            return;
          }
          if (draft.waitTime < 0) {
            draft.waitTime = 0;
          }
          if (intervalCountSendTime) {
            clearInterval(intervalCountSendTime);
          }
        });
      }, 1000),
    );
  };

  const customRenderMenuItem = (item: PickerDataItem, onPressMenuItem: (item: PickerDataItem) => void): JSX.Element => {
    const country = COUNTRIES.find((c) => c.code === item.value);
    if (!country) {
      return <></>;
    }
    const title = `(${country.dialCode}) ${country.name}`;
    return <Menu.Item key={item.value} onPress={() => onPressMenuItem(item)} title={title} style={styles.menuItem} />;
  };

  const form = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit: sendCode,
  });
  const {submitForm} = form;
  const fields: FormField<FormData>[] = [
    {
      name: 'countryCode',
      type: 'autocomplete',
      dataSources: countries,
      disabled: verificationStatus.codeSent,
      menuWidth: screen.width - 80,
      customRenderMenuItem,
      label: ' ',
    },
    {
      name: 'phoneNo',
      type: 'text',
      disabled: verificationStatus.codeSent,
      keyboardType: 'number-pad',
    },
  ];

  const signIn = async (formValues: {verificationCode: string}): Promise<void> => {
    await verifyCode(formValues.verificationCode);
  };

  const codeForm = useForm<{verificationCode: string}>({
    initialValues: {verificationCode: ''},
    validationSchema: Yup.object().shape({
      verificationCode: Yup.string().required(t('common:required')),
    }),
    onSubmit: signIn,
  });

  const codeField: FormField<{verificationCode: string}> = {
    name: 'verificationCode',
    type: 'text',
    keyboardType: 'number-pad',
  };

  return (
    <Layout header headerBackButton headerTitle={t('signInWithPhoneNo')} style={styles.container}>
      <View row>
        <View flex={1}>
          <FormInput form={form} t={t} field={fields[0]} />
        </View>
        <View flex={2}>
          <FormInput form={form} t={t} field={fields[1]} />
        </View>
      </View>
      <Button style={styles.button} onPress={submitForm} mode='contained' disabled={verificationStatus.waitTime !== 0}>
        {`${t('sendVerificationCode')}${verificationStatus.waitTime !== 0 ? `(${verificationStatus.waitTime})` : ''}`}
      </Button>
      {verificationStatus.codeSent && (
        <>
          <FormInput form={codeForm} t={t} field={codeField} />
          <FormInput form={form} t={t} field={fields[1]} />
          <Button style={styles.button} onPress={codeForm.submitForm} mode='contained'>
            {t('signIn')}
          </Button>
        </>
      )}
    </Layout>
  );
};
