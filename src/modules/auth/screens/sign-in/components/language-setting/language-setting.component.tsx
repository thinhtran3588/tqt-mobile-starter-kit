import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, Dispatch} from '@app/stores';
import {Button, Picker, PickerDataItem} from '@core/components';
import {config} from '@core/config';
import {styles} from './language-setting.styles';

const languages: PickerDataItem[] = config().languages.map((lang) => ({value: lang.code, label: lang.text}));

export const LanguageSetting = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const language = useSelector((state: RootState) => state.language);
  const {
    language: {setLanguageI18n},
  } = useDispatch<Dispatch>();
  const selectedLang = config().languages.find((lang) => lang.code === language)?.text;
  return (
    <>
      <Button icon='globe-model' onPress={() => setOpen(true)} style={styles.button}>
        {selectedLang}
      </Button>
      <Picker
        key='language-picker'
        value={language}
        open={open}
        setOpen={setOpen}
        dataSources={languages}
        onChangeValue={(value) => setLanguageI18n(value || config().defaultLang)}
      />
    </>
  );
};
