import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, Dispatch} from '@app/stores';
import {config} from '@core/config';
import {COLORS} from '@core/constants';
import {ListItem, View, Picker, PickerDataItem} from '@core/components';
import {styles} from './theme-setting.styles';

const colors: PickerDataItem[] = COLORS.map((c) => ({value: c.id, label: c.text}));

export const ThemeSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const theme = useSelector((state: RootState) => state.settings.theme);
  const {
    settings: {setDarkMode, setPrimaryColor, setUseSystemTheme},
  } = useDispatch<Dispatch>();
  const selectedColor = COLORS.find((c) => c.id === theme.primaryColor)?.text;

  return (
    <>
      <ListItem
        title={t('useSystemTheme')}
        leftIcon='theme-light-dark'
        switchRight
        switchRightValue={theme.useSystemTheme}
        switchRightOnValueChange={setUseSystemTheme}
        switchRightTestID='system-theme-switch'
      />
      <ListItem
        title={t('darkTheme')}
        leftIcon='theme-light-dark'
        switchRight
        switchRightValue={theme.darkMode}
        switchRightOnValueChange={setDarkMode}
        switchRightDisabled={theme.useSystemTheme}
        switchRightTestID='dark-theme-switch'
      />
      <View>
        <ListItem
          testID='primary-color-list-item'
          title={t('primaryColor')}
          description={selectedColor}
          leftIcon='format-color-fill'
          rightIcon='chevron-right'
          onPress={() => setOpenColorPicker(true)}
        />
        <View style={[styles.colorBox, {backgroundColor: theme.colors.primary}]} />
        <Picker
          key='primary-color-picker'
          value={theme.primaryColor}
          open={openColorPicker}
          setOpen={setOpenColorPicker}
          dataSources={colors}
          onChangeValue={(value) => setPrimaryColor(value || config().defaultPrimaryColor)}
        />
      </View>
    </>
  );
};
