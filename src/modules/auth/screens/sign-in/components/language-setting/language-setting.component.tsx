import React, {useState} from 'react';
import {Button, Picker, PickerDataItem} from '@core/components';
import {LANGUAGES, useLanguage} from '@core/contexts';
import {config} from '@core/config';
import {styles} from './language-setting.styles';

const languages: PickerDataItem[] = LANGUAGES.map((lang) => ({value: lang.code, label: lang.text}));

export const LanguageSetting = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const {language, setLanguage} = useLanguage();
  const selectedLang = LANGUAGES.find((lang) => lang.code === language)?.text;
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
        onChangeValue={(value) => setLanguage(value || config().defaultLang)}
      />
    </>
  );
};
