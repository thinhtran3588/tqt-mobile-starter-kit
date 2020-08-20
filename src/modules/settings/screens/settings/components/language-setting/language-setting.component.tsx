import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, Dispatch} from '@app/stores';
import {ListItem, Picker, PickerDataItem} from '@core/components';
import {config} from '@core/config';

const languages: PickerDataItem[] = config().languages.map((lang) => ({value: lang.code, label: lang.text}));

export const LanguageSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [open, setOpen] = useState(false);
  const language = useSelector((state: RootState) => state.language);
  const {
    language: {setLanguageI18n},
  } = useDispatch<Dispatch>();
  const selectedLang = config().languages.find((lang) => lang.code === language)?.text;
  return (
    <>
      <ListItem
        testID='language-list-item'
        title={t('language')}
        description={selectedLang}
        leftIcon='globe-model'
        rightIcon='chevron-right'
        onPress={() => setOpen(true)}
      />
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
