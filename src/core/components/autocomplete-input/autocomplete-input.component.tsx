/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useEffect} from 'react';
import {Keyboard, LayoutChangeEvent} from 'react-native';
import {TextInput as RNTextInput, Menu} from 'react-native-paper';
import {TextInput} from '../text-input/text-input.component';
import {View} from '../view/view.component';
import {Text} from '../text/text.component';
import {PickerDataItem} from '../picker/picker.component';
import {styles} from './autocomplete-input.styles';

export type AutocompleteInputProps = React.ComponentProps<typeof RNTextInput> & {
  value: string;
  errorMessage?: string;
  clear?: () => void;
  dataSources: PickerDataItem[];
  onChangeValue: (value: string) => void;
  maxItemsShown?: number;
  customRenderMenuItem?: (item: PickerDataItem, onPressMenuItem: (item: PickerDataItem) => void) => void;
  menuWidth?: number;
};

export const AutocompleteInput = (props: AutocompleteInputProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const {
    value,
    dataSources,
    onChangeValue,
    disabled,
    maxItemsShown = 5,
    errorMessage,
    customRenderMenuItem,
    menuWidth: overrideMenuWidth,
    ...other
  } = props;
  const label = dataSources.find((item) => item.value === value)?.label || '';
  const [matchedItems, setMatchedItems] = useState<PickerDataItem[]>(
    dataSources.filter((_item, index) => index < maxItemsShown),
  );
  const [text, setText] = useState(label);
  const [menuWidth, setMenuWidth] = useState(overrideMenuWidth || 0);

  useEffect(() => {
    setText(label);
    setOpen(false);
    Keyboard.dismiss();
  }, [label]);

  const onBlur = (): void => {
    const matchedItem = dataSources.find((item) => item.label === text);
    if (!text) {
      onChangeValue('');
    } else if (!matchedItem) {
      setText(label);
    } else {
      onChangeValue(matchedItem.value);
    }
    setOpen(false);
  };

  const onFocus = (): void => {
    setOpen(true);
  };

  const onChangeText = (textValue: string): void => {
    setText(textValue);
    const newMatchedItems = dataSources
      .filter((item) => item.label.includes(textValue))
      .filter((_item, index) => index < maxItemsShown);
    setMatchedItems(newMatchedItems);
    if (newMatchedItems.length > 0) {
      if (newMatchedItems.length === 1 && newMatchedItems[0].label === textValue) {
        onChangeValue(newMatchedItems[0].value);
        setOpen(false);
      } else {
        setOpen(true);
      }
    } else {
      setOpen(false);
    }
  };

  const onPressMenuItem = (item: PickerDataItem): void => {
    onChangeValue(item.value);
    setOpen(false);
  };

  const onLayout = (event: LayoutChangeEvent): void => {
    const width = overrideMenuWidth || event.nativeEvent.layout.width;
    if (width !== menuWidth) {
      setMenuWidth(width);
    }
  };

  return (
    <View onLayout={onLayout}>
      <TextInput
        {...other}
        value={text}
        disabled={disabled}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
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
      {errorMessage && (
        <Text style={styles.error} error={Boolean(errorMessage)}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
