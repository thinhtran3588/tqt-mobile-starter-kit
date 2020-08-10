/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {TextInput as RNTextInput, IconButton} from 'react-native-paper';
import {TextInput} from '../text-input/text-input.component';
import {PickerDataItem, Picker} from '../picker/picker.component';
import {View} from '../view/view.component';
import {styles} from './picker-input.styles';

export type PickerInputProps = React.ComponentProps<typeof RNTextInput> & {
  value: string;
  errorMessage?: string;
  clear?: () => void;
  dataSources: PickerDataItem[];
  onChangeValue: (value: string) => void;
};

export const PickerInput = (props: PickerInputProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const {value, dataSources, onChangeValue, disabled, ...other} = props;
  const label = dataSources.find((item) => item.value === value)?.label;
  const openModal = (): void => {
    if (!disabled) {
      setOpen(true);
    }
  };
  return (
    <View>
      <TextInput {...other} value={label} showClearButton={false} disabled={disabled} />
      {!disabled && <IconButton style={styles.dropdownIcon} icon='chevron-down' size={20} />}
      <Pressable style={styles.overlay} onPress={openModal}>
        <View />
      </Pressable>
      <Picker value={value} open={open} setOpen={setOpen} dataSources={dataSources} onChangeValue={onChangeValue} />
    </View>
  );
};
