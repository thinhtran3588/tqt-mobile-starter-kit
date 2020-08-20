/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {forwardRef} from 'react';
import RNPicker, {PickerOptions} from 'react-native-picker';
import dayjs from 'dayjs';
import colorConvert from 'color-convert';
import {Modal, Pressable, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {useNotification} from '../../hooks/use-notification';
import {Blur} from '../blur/blur.component';
import {styles} from './date-picker.styles';

export interface DatePickerDataItem {
  value: Date;
  label: string;
}
export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  open?: boolean;
  setOpen: (open: boolean) => void;
  onChangeValue?: (value: Date) => void;
  fromDate?: Date;
  toDate?: Date;
}

const createPickerData = (fromDate: Date, toDate: Date): string[][] => {
  const minYear = fromDate.getFullYear();
  const maxYear = toDate.getFullYear();
  const pickerData = [
    Array.from(new Array(31), (x, i) => (i + 1).toString()),
    Array.from(new Array(12), (x, i) => (i + 1).toString()),
    Array.from(new Array(maxYear - minYear + 1), (x, i) => (i + minYear).toString()),
  ];
  return pickerData;
};

export const DatePicker = forwardRef((props: DatePickerProps, ref: any) => {
  const {open, fromDate, toDate, setOpen, value: initialValue, defaultValue, onChangeValue} = props;
  const {t} = useTranslation('common');
  const {showNotification} = useNotification();
  const theme = useTheme();
  const minDate = fromDate || new Date(1900, 0, 1);
  const maxDate = toDate || new Date(2099, 11, 31);
  const date = initialValue || defaultValue || minDate;
  const selectedValue = [date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString()];

  const onClose = (): void => {
    setOpen(false);
  };

  const onPickerConfirm = (items: string[]): void => {
    const newDate = dayjs(new Date(+items[2], +items[1] - 1, +items[0]));
    const currentDate = dayjs(initialValue);
    if (
      newDate.date().toString() !== items[0] ||
      (newDate.month() + 1).toString() !== items[1] ||
      newDate.year().toString() !== items[2]
    ) {
      showNotification({message: t('invalidDate'), type: 'ERROR'});
    } else if (!newDate.isSame(currentDate) && onChangeValue) {
      onChangeValue(
        currentDate
          .set('year', newDate.year())
          .set('month', newDate.month())
          .set('date', newDate.date())
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0)
          .toDate(),
      );
    }
    onClose();
  };

  const onShow = (): void => {
    const primaryColorHexArr = [...colorConvert.hex.rgb(theme.colors.primary), 1];
    const whiteColorHexArr = [...colorConvert.hex.rgb('#fff'), 1];
    const pickerTextColorHexArr = [...colorConvert.hex.rgb(theme.colors.text), 1];
    const pickerBackgroundHexArr = [...colorConvert.hex.rgb(theme.colors.background), Platform.OS === 'ios' ? 0 : 0.9];
    const pickerData = createPickerData(minDate, maxDate);
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
