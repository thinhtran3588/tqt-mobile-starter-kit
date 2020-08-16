/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {TextInput as RNTextInput, IconButton} from 'react-native-paper';
import dayjs from 'dayjs';
import {config} from '@core/config';
import {TextInput} from '../text-input/text-input.component';
import {View} from '../view/view.component';
import {styles} from './datetime-picker-input.styles';
import {DatePicker} from '../date-picker/date-picker.component';
import {TimePicker} from '../time-picker/time-picker.component';

export type DatetimePickerInputProps = Omit<
  React.ComponentProps<typeof RNTextInput>,
  'value' | 'onChangeText' | 'defaultValue' | 'onBlur'
> & {
  value?: Date;
  defaultValue?: Date;
  defaultPickerValue?: Date;
  errorMessage?: string;
  onChangeValue?: (value?: Date) => void;
  format?: string;
  type?: 'datePicker' | 'timePicker' | 'dateTimePicker';
  clearButtonVisible?: boolean;
};

const ICON_SIZE = 20;

export const DatetimePickerInput = (props: DatetimePickerInputProps): JSX.Element => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const {
    value,
    defaultValue,
    defaultPickerValue,
    onChangeValue,
    disabled,
    format,
    type = 'dateTimePicker',
    clearButtonVisible = true,
    ...other
  } = props;
  let defaultFormat: string;
  switch (type) {
    case 'datePicker':
      defaultFormat = config().dateFormat;
      break;
    case 'timePicker':
      defaultFormat = config().timeFormat;
      break;
    default:
      defaultFormat = config().datetimeFormat;
  }
  const label = value ? dayjs(value).format(format || defaultFormat) : '';
  const openModal = (): void => {
    if (disabled) {
      return;
    }
    if (type === 'datePicker') {
      setOpenDatePicker(true);
    } else if (type === 'timePicker') {
      setOpenTimePicker(true);
    }
  };
  const clear = (): void => {
    onChangeValue && onChangeValue(defaultValue);
  };

  return (
    <View>
      <TextInput {...other} value={label} disabled={disabled} clear={clear} showClearButton={false} />
      <Pressable style={styles.overlay} onPress={openModal}>
        <View />
      </Pressable>
      {!disabled && (
        <View row style={styles.iconContainer}>
          {clearButtonVisible && Boolean(value) && <IconButton icon='close' size={ICON_SIZE} onPress={clear} />}
          {type === 'dateTimePicker' && (
            <>
              <IconButton
                style={styles.icon}
                icon='calendar'
                size={ICON_SIZE}
                onPress={() => setOpenDatePicker(true)}
              />
              <IconButton
                style={styles.icon}
                icon='clock-outline'
                size={ICON_SIZE}
                onPress={() => setOpenTimePicker(true)}
              />
            </>
          )}
        </View>
      )}
      <DatePicker
        value={value || defaultPickerValue}
        open={openDatePicker}
        setOpen={setOpenDatePicker}
        onChangeValue={onChangeValue}
      />
      <TimePicker
        value={value || defaultPickerValue}
        open={openTimePicker}
        setOpen={setOpenTimePicker}
        onChangeValue={onChangeValue}
      />
    </View>
  );
};
