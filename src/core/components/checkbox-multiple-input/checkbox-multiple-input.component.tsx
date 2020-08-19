import React from 'react';
import {TextInput} from '../text-input/text-input.component';
import {View} from '../view/view.component';
import {Text} from '../text/text.component';
import {PickerDataItem} from '../picker/picker.component';
import {styles} from './checkbox-multiple-input.styles';
import {Checkbox} from '../checkbox/checkbox.component';

export interface CheckboxMultipleInputProps {
  label?: string;
  values?: (string | undefined)[];
  errorMessages?: string | string[];
  dataSources: PickerDataItem[];
  disabled?: boolean;
  onChangeValues?: (values: (string | undefined)[]) => void;
}

export const CheckboxMultipleInput = (props: CheckboxMultipleInputProps): JSX.Element => {
  const {label, values, errorMessages, dataSources, onChangeValues, disabled} = props;
  const toggleItem = (value?: string): void => {
    let newValues = values || [];
    if (newValues.includes(value)) {
      newValues = newValues.filter((val) => val !== value);
    } else {
      newValues = [...newValues, value];
    }
    onChangeValues && onChangeValues(newValues);
  };

  return (
    <>
      <TextInput label={label} value={' '} disabled />
      <View style={styles.checkboxContainer}>
        {dataSources.map((item) => (
          <Checkbox
            key={item.value}
            title={item.label}
            status={values && values.includes(item.value) ? 'checked' : 'unchecked'}
            onPress={() => toggleItem(item.value)}
            disabled={disabled}
          />
        ))}
      </View>
      {errorMessages && (
        <Text style={styles.error} error={Boolean(errorMessages)}>
          {Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages}
        </Text>
      )}
    </>
  );
};
