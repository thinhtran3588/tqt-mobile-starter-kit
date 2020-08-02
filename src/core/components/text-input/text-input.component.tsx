/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
import {TextInput as RNTextInput, IconButton} from 'react-native-paper';
import {useAppTheme, LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR} from '@core/contexts';
import {Text} from '../text/text.component';
import {View} from '../view/view.component';
import {styles} from './text-input.styles';

export type TextInputProps = React.ComponentProps<typeof RNTextInput> & {
  error?: string;
};

export const TextInput = (props: TextInputProps): JSX.Element => {
  const [appTheme] = useAppTheme();
  const backgroundColor = appTheme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const {style, secureTextEntry, error, ...other} = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <RNTextInput
        secureTextEntry={secureTextEntry && !showPassword}
        style={[styles.textInput, {backgroundColor}, style]}
        {...other}
      />
      <Text style={styles.error} error={Boolean(error)}>
        {error}
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
