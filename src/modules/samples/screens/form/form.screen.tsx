import React, {useState} from 'react';
import * as Yup from 'yup';
import COUNTRIES from '@assets/json/countries.json';
import {Button, Layout, PickerDataItem, ScrollView, Menu, FormInput, FormField} from '@core/components';
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
  countries: string[];
  date?: Date;
}

const languages: PickerDataItem[] = LANGUAGES.map((lang) => ({value: lang.code, label: lang.text}));
const countries: PickerDataItem[] = COUNTRIES.map((country) => ({value: country.code, label: country.name}));

export const FormScreen = (): JSX.Element => {
  const {t} = useTranslation('common');
  const [disabled, setDisabled] = useState(false);
  const {
    dispatch: {openConfirmation},
  } = useConfirmation();
  const [initialValues] = useState<FormData>({
    email: 'a@a.com',
    password: 'Abc@12345',
    text: 'text',
    number: 0,
    language: 'vi',
    country: 'VN',
    countries: ['VN'],
    date: new Date(),
  });

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common:invalid')).required(t('common:required')),
    password: Yup.string().required(t('common:required')),
    text: Yup.string(),
    number: Yup.number().required(t('common:required')),
    language: Yup.string().required(t('common:required')),
    country: Yup.string().required(t('common:required')),
    countries: Yup.array()
      .of(Yup.string().required(t('common:required')))
      .required(t('common:required')),
    date: Yup.date(),
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

  const form = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {values, submitForm} = form;

  const customRenderMenuItem = (item: PickerDataItem, onPressMenuItem: (item: PickerDataItem) => void): JSX.Element => {
    const country = COUNTRIES.find((c) => c.code === item.value);
    if (!country) {
      return <></>;
    }
    const title = `${country.name}(${country.dialCode})`;
    return <Menu.Item key={item.value} onPress={() => onPressMenuItem(item)} title={title} style={styles.menuItem} />;
  };

  const fields: FormField<FormData>[] = [
    {
      name: 'email',
      type: 'text',
      disabled,
    },
    {
      name: 'password',
      type: 'text',
      disabled,
      secureTextEntry: true,
    },
    {
      name: 'text',
      type: 'text',
      disabled,
      label: 'Text',
    },
    {
      name: 'number',
      type: 'text',
      disabled,
      label: 'Number',
      value: values.number.toString(),
      defaultValue: '0',
      keyboardType: 'number-pad',
    },
    {
      name: 'language',
      type: 'picker',
      disabled,
      label: 'Picker',
      dataSources: languages,
    },
    {
      name: 'date',
      type: 'datePicker',
      disabled,
      label: 'Date Picker',
      defaultPickerValue: new Date(),
    },
    {
      name: 'date',
      type: 'timePicker',
      disabled,
      label: 'Time Picker',
      defaultPickerValue: new Date(),
    },
    {
      name: 'date',
      type: 'dateTimePicker',
      disabled,
      label: 'DateTime Picker',
      defaultPickerValue: new Date(),
    },
    {
      name: 'country',
      type: 'autocomplete',
      disabled,
      label: 'Autocomplete',
      dataSources: countries,
    },
    {
      name: 'country',
      type: 'autocomplete',
      disabled,
      label: 'Autocomplete (custom)',
      dataSources: countries,
      customRenderMenuItem,
    },
    {
      name: 'countries',
      type: 'autocomplete-multiple',
      disabled,
      label: 'Autocomplete Multiple',
      dataSources: countries,
    },
  ];

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        {fields.map((field, index) => (
          <FormInput key={index.toString()} form={form} t={t} field={field} />
        ))}
        <Button style={styles.button} onPress={submitForm} mode='contained'>
          Submit
        </Button>
        <Button style={styles.button} onPress={() => setDisabled(!disabled)} mode='contained'>
          {disabled ? 'Enable' : 'Disable'}
        </Button>
      </ScrollView>
    </Layout>
  );
};
