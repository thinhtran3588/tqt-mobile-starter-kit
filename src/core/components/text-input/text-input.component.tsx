/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {TextInput as RNTextInput, IconButton} from 'react-native-paper';
import {useAppTheme, LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR} from '@core/contexts';
import {Text} from '../text/text.component';
import {View} from '../view/view.component';
import {styles} from './text-input.styles';

export type TextInputProps = React.ComponentProps<typeof RNTextInput> & {
  errorMessage?: string;
};

export const TextInput = (props: TextInputProps): JSX.Element => {
  const {style, secureTextEntry, error, errorMessage, ...other} = props;
  const {appTheme} = useAppTheme();
  const backgroundColor = appTheme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <RNTextInput
        secureTextEntry={secureTextEntry && !showPassword}
        style={[styles.textInput, {backgroundColor}, style]}
        error={error || Boolean(errorMessage)}
        {...other}
      />
      <Text style={styles.error} error={Boolean(errorMessage)}>
        {errorMessage}
      </Text>
      {secureTextEntry && (
        <IconButton
          icon={showPassword ? 'eye' : 'eye-off'}
          style={styles.passwordIcon}
          size={20}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </View>
  );
};
