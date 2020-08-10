import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {useAppTheme, COLORS} from '@core/contexts';
import {ListItem, View, Picker, PickerDataItem} from '@core/components';
import {styles} from './theme-setting.styles';

const colors: PickerDataItem[] = COLORS.map((c) => ({value: c.id, label: c.text}));

export const ThemeSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const theme = useTheme();
  const {
    appTheme,
    dispatch: {setDarkMode, setUseSystemTheme, setPrimaryColor},
  } = useAppTheme();
  const selectedColor = COLORS.find((c) => c.id === appTheme.primaryColorId)?.text;

  return (
    <>
      <ListItem
        title={t('useSystemTheme')}
        leftIcon='theme-light-dark'
        switchRight
        switchRightValue={appTheme.useSystemTheme}
        switchRightOnValueChange={setUseSystemTheme}
        switchRightTestID='system-theme-switch'
      />
      <ListItem
        title={t('darkTheme')}
        leftIcon='theme-light-dark'
        switchRight
        switchRightValue={appTheme.darkMode}
        switchRightOnValueChange={setDarkMode}
        switchRightDisabled={appTheme.useSystemTheme}
        switchRightTestID='dark-theme-switch'
      />
      <View>
        <ListItem
          testID='primary-color-list-item'
          title={t('primaryColor')}
          description={selectedColor}
          leftIcon='format-color-fill'
          rightIcon='chevron-right'
          onPress={() => setColorPickerOpen(true)}
        />
        <View style={[styles.colorBox, {backgroundColor: theme.colors.primary}]} />
        <Picker
          key='primary-color-picker'
          value={appTheme.primaryColorId}
          open={colorPickerOpen}
          setOpen={setColorPickerOpen}
          dataSources={colors}
          onChangeValue={setPrimaryColor}
        />
      </View>
    </>
  );
};
