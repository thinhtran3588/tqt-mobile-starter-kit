/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {FormikContextType} from 'formik';
import {TFunction} from 'i18next';
import {TextInput, TextInputProps} from '../text-input/text-input.component';
import {PickerInput, PickerInputProps} from '../picker-input/picker-input.component';
import {DatetimePickerInput, DatetimePickerInputProps} from '../datetime-picker-input/datetime-picker-input.component';
import {AutocompleteInputProps, AutocompleteInput} from '../autocomplete-input/autocomplete-input.component';
import {
  AutocompleteMultipleInputProps,
  AutocompleteMultipleInput,
} from '../autocomplete-multiple-input/autocomplete-multiple-input.component';

export type FormInputProps<Values> = (
  | (TextInputProps & {type: 'text'})
  | (PickerInputProps & {type: 'picker'})
  | (DatetimePickerInputProps & {type: 'datePicker' | 'timePicker' | 'dateTimePicker'})
  | (AutocompleteInputProps & {type: 'autocomplete'})
  | (AutocompleteMultipleInputProps & {type: 'autocomplete-multiple'})
) & {field?: keyof Values; form?: FormikContextType<Values>; t?: TFunction};

type FormInput = <FormData>(props: FormInputProps<FormData>) => JSX.Element;

export const FormInput: FormInput = (props) => {
  const {type = 'text', form, field, t, ...other} = props;
  const extendedProps = {
    onChangeText: form && field ? form.handleChange(field) : undefined,
    onChangeValue: form && field ? (val?: unknown) => form.setFieldValue(field as string, val) : undefined,
    onBlur: form && field ? form.handleBlur(field) : undefined,
    errorMessage: form && field ? form.errors[field] : '',
    value: form && field ? form.values[field] : undefined,
    label: field && t ? t(field as string) : undefined,
  };

  switch (type) {
    case 'picker': {
      const pickerProps = other as PickerInputProps;
      return (
        <PickerInput
          {...pickerProps}
          value={pickerProps.value || ((extendedProps.value as unknown) as string)}
          label={other.label || extendedProps.label}
          onChangeValue={pickerProps.onChangeValue || extendedProps.onChangeValue}
          errorMessage={pickerProps.errorMessage || (extendedProps.errorMessage as string)}
        />
      );
    }
    case 'timePicker':
    case 'datePicker':
    case 'dateTimePicker': {
      const pickerProps = other as DatetimePickerInputProps;
      return (
        <DatetimePickerInput
          {...pickerProps}
          type={type}
          value={pickerProps.value || ((extendedProps.value as unknown) as Date)}
          label={other.label || extendedProps.label}
          onChangeValue={pickerProps.onChangeValue || extendedProps.onChangeValue}
          errorMessage={pickerProps.errorMessage || (extendedProps.errorMessage as string)}
        />
      );
    }
    case 'autocomplete': {
      const autocompleteProps = other as AutocompleteInputProps;
      return (
        <AutocompleteInput
          {...autocompleteProps}
          value={autocompleteProps.value || ((extendedProps.value as unknown) as string)}
          label={other.label || extendedProps.label}
          onChangeValue={autocompleteProps.onChangeValue || extendedProps.onChangeValue}
          errorMessage={autocompleteProps.errorMessage || (extendedProps.errorMessage as string)}
        />
      );
    }
    case 'autocomplete-multiple': {
      const autocompleteMultipleProps = other as AutocompleteMultipleInputProps;
      return (
        <AutocompleteMultipleInput
          {...autocompleteMultipleProps}
          values={autocompleteMultipleProps.values || ((extendedProps.value as unknown) as string[])}
          label={other.label || extendedProps.label}
          onChangeValues={autocompleteMultipleProps.onChangeValues || extendedProps.onChangeValue}
          errorMessages={autocompleteMultipleProps.errorMessages || (extendedProps.errorMessage as string)}
        />
      );
    }
    default: {
      const textProps = other as TextInputProps;
      return (
        <TextInput
          {...textProps}
          value={textProps.value || ((extendedProps.value as unknown) as string)}
          label={other.label || extendedProps.label}
          onChangeText={textProps.onChangeText || extendedProps.onChangeText}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onBlur={textProps.onBlur || (extendedProps.onBlur as any)}
          errorMessage={textProps.errorMessage || (extendedProps.errorMessage as string)}
        />
      );
    }
  }
};
