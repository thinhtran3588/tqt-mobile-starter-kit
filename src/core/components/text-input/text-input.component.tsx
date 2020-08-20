/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useRef} from 'react';
import {TextInput as RNTextInput, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
import {LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR} from '@core/constants';
import {Text} from '../text/text.component';
import {View} from '../view/view.component';
import {styles} from './text-input.styles';

export type TextInputProps = React.ComponentProps<typeof RNTextInput> & {
  errorMessage?: string;
  showClearButton?: boolean;
  alwaysShowClearButton?: boolean;
  defaultValue?: string;
  clear?: () => void;
  clearFocus?: boolean;
};

const ICON_SIZE = 20;

export const TextInput = (props: TextInputProps): JSX.Element => {
  const {
    value,
    style,
    secureTextEntry,
    error,
    errorMessage,
    disabled,
    showClearButton = true,
    alwaysShowClearButton = false,
    onChangeText,
    defaultValue = '',
    clear: clearInput,
    clearFocus = true,
    ...other
  } = props;
  const theme = useSelector((state: RootState) => state.theme);
  const backgroundColor = theme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const [showPassword, setShowPassword] = useState(false);
  const clearButtonVisible = (showClearButton && Boolean(value)) || alwaysShowClearButton;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEl = useRef<any>(undefined);

  const clear = (): void => {
    if (clearInput) {
      clearInput();
    } else {
      onChangeText && onChangeText(defaultValue);
    }
    if (clearFocus) {
      setTimeout(() => inputEl.current.focus(), 100);
    }
  };

  return (
    <View>
      <RNTextInput
        ref={inputEl}
        value={value}
        secureTextEntry={secureTextEntry && !showPassword}
        style={[styles.textInput, {backgroundColor}, style]}
        error={error || Boolean(errorMessage)}
        disabled={disabled}
        onChangeText={onChangeText}
        {...other}
      />
      {Boolean(errorMessage) && (
        <Text style={styles.error} error={Boolean(errorMessage)}>
          {errorMessage}
        </Text>
      )}
      {!disabled && (
        <View row style={styles.iconContainer}>
          {clearButtonVisible && <IconButton icon='close' size={ICON_SIZE} onPress={clear} />}
          {secureTextEntry && (
            <IconButton
              style={styles.showPasswordIcon}
              icon={showPassword ? 'eye' : 'eye-off'}
              size={ICON_SIZE}
              onPress={() => setShowPassword(!showPassword)}
            />
          )}
        </View>
      )}
    </View>
  );
};
