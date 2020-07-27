import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {usePrimaryColor, COLORS} from '@core/contexts';
import {ListItem, Picker} from '@core/components';
import {PickerDataItem} from '@app/core/interfaces';

const colors: PickerDataItem<string>[] = COLORS.map((c) => ({value: c.code, label: c.text}));

export const PrimaryColorSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = usePrimaryColor();
  const selectedColor = COLORS.find((c) => c.code === primaryColor)?.text;
  return (
    <>
      <ListItem
        testID='primary-color-list-item'
        title={t('primaryColor')}
        description={selectedColor}
        leftIcon='format-color-fill'
        rightIcon='chevron-right'
        onPress={() => setPickerOpen(true)}
      />
      <Picker
        key='primary-color-picker'
        initialValue={primaryColor}
        open={pickerOpen}
        setOpen={setPickerOpen}
        dataSources={colors}
        onChangeValue={setPrimaryColor}
      />
    </>
  );
};
