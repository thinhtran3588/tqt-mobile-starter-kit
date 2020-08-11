/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {TextInput as RNTextInput, IconButton} from 'react-native-paper';
import {useAppTheme, LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR} from '@core/contexts';
import {Text} from '../text/text.component';
import {View} from '../view/view.component';
import {styles} from './text-input.styles';

export type TextInputProps = React.ComponentProps<typeof RNTextInput> & {
  errorMessage?: string;
  showClearButton?: boolean;
  defaultValue?: string;
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
    onChangeText,
    defaultValue = '',
    ...other
  } = props;
  const {appTheme} = useAppTheme();
  const backgroundColor = appTheme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <RNTextInput
        value={value}
        secureTextEntry={secureTextEntry && !showPassword}
        style={[styles.textInput, {backgroundColor}, style]}
        error={error || Boolean(errorMessage)}
        disabled={disabled}
        onChangeText={onChangeText}
        {...other}
      />
      {errorMessage && (
        <Text style={styles.error} error={Boolean(errorMessage)}>
          {errorMessage}
        </Text>
      )}
      {!disabled && (
        <View row style={styles.iconContainer}>
          {showClearButton && Boolean(value) && (
            <IconButton icon='close' size={ICON_SIZE} onPress={() => onChangeText && onChangeText(defaultValue)} />
          )}
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
