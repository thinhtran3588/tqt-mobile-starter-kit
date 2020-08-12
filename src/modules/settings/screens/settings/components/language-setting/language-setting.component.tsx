import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLanguage, LANGUAGES} from '@core/contexts';
import {ListItem, Picker, PickerDataItem} from '@core/components';
import {config} from '@core/config';

const languages: PickerDataItem[] = LANGUAGES.map((lang) => ({value: lang.code, label: lang.text}));

export const LanguageSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [pickerOpen, setPickerOpen] = useState(false);
  const {language, setLanguage} = useLanguage();
  const selectedLang = LANGUAGES.find((lang) => lang.code === language)?.text;
  return (
    <>
      <ListItem
        testID='language-list-item'
        title={t('language')}
        description={selectedLang}
        leftIcon='globe-model'
        rightIcon='chevron-right'
        onPress={() => setPickerOpen(true)}
      />
      <Picker
        key='language-picker'
        value={language}
        open={pickerOpen}
        setOpen={setPickerOpen}
        dataSources={languages}
        onChangeValue={(value) => setLanguage(value || config().defaultLang)}
      />
    </>
  );
};
