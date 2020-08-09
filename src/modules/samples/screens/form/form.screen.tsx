import React, {useState} from 'react';
import * as Yup from 'yup';
import {Button, TextInput, Layout, View} from '@core/components';
import {useConfirmation} from '@core/contexts';
import {useForm} from '@core/hooks';
import {useTranslation} from 'react-i18next';
import {styles} from './form.styles';

interface FormData {
  email: string;
  password: string;
  text?: string;
  number: number;
}

export const FormScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const {
    dispatch: {openConfirmation},
  } = useConfirmation();
  const [initialValues] = useState<FormData>({
    email: '',
    password: '',
    text: '',
    number: 0,
  });

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common:invalid')).required(t('common:required')),
    password: Yup.string().required(t('common:required')),
    text: Yup.string(),
    number: Yup.number().required(t('common:required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    const submitValues = {
      ...formValues,
      number: Number.parseInt((formValues.number as unknown) as string, 10),
    };
    openConfirmation({
      message: JSON.stringify(submitValues),
      buttons: [
        {
          text: 'OK',
        },
      ],
    });
  };

  const {handleChange, handleBlur, values, errors, submitForm} = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Layout>
      <View style={styles.container}>
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
          label='Text'
          onChangeText={handleChange('text')}
          onBlur={handleBlur('text')}
          value={values.text}
          errorMessage={errors.text}
        />
        <TextInput
          label='Number'
          onChangeText={handleChange('number')}
          onBlur={handleBlur('number')}
          value={values.number.toString()}
          errorMessage={errors.number}
          keyboardType='number-pad'
        />
        <Button onPress={submitForm} mode='contained'>
          Submit
        </Button>
      </View>
    </Layout>
  );
};
