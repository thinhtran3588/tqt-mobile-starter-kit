/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {TextInput as RNTextInput, Menu, Chip} from 'react-native-paper';
import {TextInput} from '../text-input/text-input.component';
import {View} from '../view/view.component';
import {Text} from '../text/text.component';
import {PickerDataItem} from '../picker/picker.component';
import {styles} from './autocomplete-multiple-input.styles';

export type AutocompleteMultipleInputProps = React.ComponentProps<typeof RNTextInput> & {
  values?: (string | undefined)[];
  errorMessages?: string | string[];
  clear?: () => void;
  dataSources: PickerDataItem[];
  onChangeValues?: (values: (string | undefined)[]) => void;
  maxItemsShown?: number;
  customRenderMenuItem?: (item: PickerDataItem, onPressMenuItem: (item: PickerDataItem) => void) => void;
  menuWidth?: number;
};

export const AutocompleteMultipleInput = (props: AutocompleteMultipleInputProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const {
    values,
    dataSources,
    onChangeValues,
    disabled,
    maxItemsShown = 5,
    errorMessages,
    customRenderMenuItem,
    menuWidth: overrideMenuWidth,
    ...other
  } = props;
  const [matchedItems, setMatchedItems] = useState<PickerDataItem[]>(
    dataSources.filter((_item, index) => index < maxItemsShown),
  );
  const [text, setText] = useState('');
  const [menuWidth, setMenuWidth] = useState(overrideMenuWidth || 0);

  const onFocus = (): void => {
    setOpen(true);
  };

  const onChangeText = (textValue: string): void => {
    setText(textValue);
    const newMatchedItems = dataSources
      .filter((item) => item.label.includes(textValue))
      .filter((_item, index) => index < maxItemsShown);
    setMatchedItems(newMatchedItems);
    setOpen(newMatchedItems.length > 0);
  };

  const onPressMenuItem = (item: PickerDataItem): void => {
    if (!values) {
      onChangeValues && onChangeValues([item.value]);
    } else if (!values.includes(item.value)) {
      onChangeValues && onChangeValues([...values, item.value]);
    }
    setText('');
    setOpen(false);
  };

  const onLayout = (event: LayoutChangeEvent): void => {
    const width = overrideMenuWidth || event.nativeEvent.layout.width;
    if (width !== menuWidth) {
      setMenuWidth(width);
    }
  };

  const removeItem = (value?: string): void => {
    onChangeValues && onChangeValues(values ? values.filter((val) => val !== value) : []);
  };

  const clear = (): void => {
    onChangeValues && onChangeValues([]);
    setText('');
  };

  return (
    <View onLayout={onLayout}>
      <TextInput
        {...other}
        value={!disabled ? text : ' '}
        disabled={disabled}
        onChangeText={onChangeText}
        onFocus={onFocus}
        clear={clear}
        alwaysShowClearButton={Boolean(values) && values && values.length > 0}
      />
      <Menu
        style={{width: menuWidth}}
        visible={!disabled && open}
        onDismiss={() => setOpen(false)}
        anchor={<View style={styles.menuAnchor} />}>
        {matchedItems.map((item) =>
          customRenderMenuItem ? (
            customRenderMenuItem(item, onPressMenuItem)
          ) : (
            <Menu.Item
              key={item.value}
              onPress={() => onPressMenuItem(item)}
              title={item.label}
              style={styles.menuItem}
            />
          ),
        )}
      </Menu>
      <View row style={[disabled ? styles.disabledChipContainer : {}]}>
        {values &&
          values.map((value) => (
            <Chip style={styles.chip} key={value} onClose={!disabled ? () => removeItem(value) : undefined}>
              {dataSources.find((item) => item.value === value)?.label}
            </Chip>
          ))}
      </View>
      {errorMessages && (
        <Text style={styles.error} error={Boolean(errorMessages)}>
          {Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages}
        </Text>
      )}
    </View>
  );
};
