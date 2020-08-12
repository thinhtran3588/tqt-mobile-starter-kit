/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {forwardRef} from 'react';
import RNPicker, {PickerOptions} from 'react-native-picker';
import dayjs from 'dayjs';
import colorConvert from 'color-convert';
import {Modal, Pressable, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {Blur} from '../blur/blur.component';
import {styles} from './time-picker.styles';

export interface TimePickerDataItem {
  value: Date;
  label: string;
}
export interface TimePickerProps {
  value: Date;
  open?: boolean;
  setOpen: (open: boolean) => void;
  onChangeValue: (value: Date) => void;
}

const createPickerData = (): string[][] => {
  const pickerData = [
    Array.from(new Array(24), (x, i) => i.toString()),
    Array.from(new Array(60), (x, i) => i.toString()),
  ];
  return pickerData;
};

export const TimePicker = forwardRef((props: TimePickerProps, ref: any) => {
  const {open, setOpen, value: initialValue, onChangeValue} = props;
  const {t} = useTranslation('common');
  const theme = useTheme();
  const date = initialValue;
  const selectedValue = [date.getHours().toString(), date.getMinutes().toString()];

  const onClose = (): void => {
    setOpen(false);
  };

  const onPickerConfirm = (items: string[]): void => {
    const newDate = dayjs(initialValue)
      .set('hour', +items[0])
      .set('minute', +items[1]);
    const currentDate = dayjs(initialValue);
    if (!newDate.isSame(currentDate)) {
      onChangeValue(currentDate.set('hour', newDate.hour()).set('minute', newDate.minute()).toDate());
    }
    onClose();
  };

  const onShow = (): void => {
    const primaryColorHexArr = [...colorConvert.hex.rgb(theme.colors.primary), 1];
    const whiteColorHexArr = [...colorConvert.hex.rgb('#fff'), 1];
    const pickerTextColorHexArr = [...colorConvert.hex.rgb(theme.colors.text), 1];
    const pickerBackgroundHexArr = [...colorConvert.hex.rgb(theme.colors.background), Platform.OS === 'ios' ? 0 : 0.9];
    const pickerData = createPickerData();
    const pickerOptions: PickerOptions = {
      pickerConfirmBtnText: t('select'),
      pickerCancelBtnText: t('cancel'),
      pickerTitleText: '',
      pickerBg: pickerBackgroundHexArr,
      pickerFontColor: pickerTextColorHexArr,
      pickerToolBarBg: primaryColorHexArr,
      pickerTitleColor: whiteColorHexArr,
      pickerCancelBtnColor: whiteColorHexArr,
      pickerConfirmBtnColor: whiteColorHexArr,
      pickerData,
      onPickerConfirm,
      onPickerCancel: onClose,
      selectedValue,
    };
    RNPicker.init(pickerOptions);
    RNPicker.show();
  };

  return (
    <Modal
      ref={ref}
      transparent
      animated
      visible={open}
      onShow={onShow}
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
      <Pressable onPress={onClose} style={styles.flex}>
        <Blur />
      </Pressable>
    </Modal>
  );
});
