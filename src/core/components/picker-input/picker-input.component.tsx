/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {TextInput as RNTextInput, IconButton} from 'react-native-paper';
import {TextInput} from '../text-input/text-input.component';
import {PickerDataItem, Picker} from '../picker/picker.component';
import {View} from '../view/view.component';
import {styles} from './picker-input.styles';

export type PickerInputProps = Omit<
  React.ComponentProps<typeof RNTextInput>,
  'value' | 'onChangeText' | 'defaultValue' | 'onBlur'
> & {
  value?: string;
  defaultValue?: string;
  errorMessage?: string;
  dataSources: PickerDataItem[];
  onChangeValue?: (value?: string) => void;
};

export const PickerInput = (props: PickerInputProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const {value, defaultValue, dataSources, onChangeValue, disabled, ...other} = props;
  const label = dataSources.find((item) => item.value === value)?.label || '';
  const openModal = (): void => {
    if (!disabled) {
      setOpen(true);
    }
  };
  const clear = (): void => {
    onChangeValue && onChangeValue(defaultValue);
  };

  return (
    <View>
      <TextInput {...other} value={label} disabled={disabled} clear={clear} clearFocus={false} />
      <Pressable style={styles.overlay} onPress={openModal}>
        <View />
      </Pressable>
      {!disabled && Boolean(value) && <IconButton style={styles.dropdownIcon} icon='close' size={20} onPress={clear} />}
      <Picker value={value} open={open} setOpen={setOpen} dataSources={dataSources} onChangeValue={onChangeValue} />
    </View>
  );
};
