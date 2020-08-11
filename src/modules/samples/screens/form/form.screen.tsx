import React, {useState} from 'react';
import * as Yup from 'yup';
import COUNTRIES from '@assets/json/countries.json';
import {
  Button,
  TextInput,
  Layout,
  View,
  PickerDataItem,
  PickerInput,
  AutocompleteInput,
  ScrollView,
} from '@core/components';
import {useConfirmation, LANGUAGES} from '@core/contexts';
import {useForm} from '@core/hooks';
import {sleep} from '@core/helpers';
import {useTranslation} from 'react-i18next';
import {styles} from './form.styles';

interface FormData {
  email: string;
  password: string;
  text?: string;
  number: number;
  language: string;
  country: string;
}

const languages: PickerDataItem[] = LANGUAGES.map((lang) => ({value: lang.code, label: lang.text}));
const countries: PickerDataItem[] = COUNTRIES.map((country) => ({value: country.code, label: country.name}));

export const FormScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const [disabled, setDisabled] = useState(false);
  const {
    dispatch: {openConfirmation},
  } = useConfirmation();
  const [initialValues] = useState<FormData>({
    email: '',
    password: '',
    text: '',
    number: 0,
    language: '',
    country: '',
  });

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common:invalid')).required(t('common:required')),
    password: Yup.string().required(t('common:required')),
    text: Yup.string(),
    number: Yup.number().required(t('common:required')),
    language: Yup.string().required(t('common:required')),
    country: Yup.string().required(t('common:required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    await sleep(1); // to show loading modal
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

  const {handleChange, handleBlur, values, errors, submitForm, setFieldValue} = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Layout>
      <ScrollView>
        <View style={styles.container}>
          <AutocompleteInput
            label='Autocomplete'
            value={values.country}
            errorMessage={errors.country}
            dataSources={countries}
            onChangeValue={handleChange('country')}
            disabled={disabled}
          />
          <TextInput
            label={t('email')}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            errorMessage={errors.email}
            disabled={disabled}
          />
          <TextInput
            label={t('password')}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            errorMessage={errors.password}
            disabled={disabled}
          />
          <TextInput
            label='Text'
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            errorMessage={errors.text}
            disabled={disabled}
          />
          <TextInput
            label='Number'
            onChangeText={handleChange('number')}
            onBlur={handleBlur('number')}
            value={values.number.toString()}
            errorMessage={errors.number}
            keyboardType='number-pad'
            defaultValue='0'
            disabled={disabled}
          />
          <PickerInput
            label='Picker'
            onChangeText={handleChange('language')}
            onBlur={handleBlur('language')}
            value={values.language}
            errorMessage={errors.language}
            clear={() => setFieldValue('language', initialValues.language)}
            dataSources={languages}
            onChangeValue={handleChange('language')}
            disabled={disabled}
          />
          <Button style={styles.button} onPress={submitForm} mode='contained'>
            Submit
          </Button>
          <Button style={styles.button} onPress={() => setDisabled(!disabled)} mode='contained'>
            {disabled ? 'Enable' : 'Disable'}
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};
