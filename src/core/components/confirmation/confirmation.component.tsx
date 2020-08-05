/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ModalProps, Modal, Pressable} from 'react-native';
import {Divider, useTheme, Surface} from 'react-native-paper';
import {getColor} from '@app/core/helpers';
import {ColorType, useAppTheme, ConfirmationState} from '@core/contexts';
import {View} from '../view/view.component';
import {Text} from '../text/text.component';
import {Blur} from '../blur/blur.component';
import {styles} from './confirmation.styles';

export interface ConfirmationButton {
  text: string;
  onPress: () => void;
  type?: ColorType;
}

export interface ConfirmationProps extends ModalProps {
  confirmation: ConfirmationState;
  closeConfirmation: () => void;
}

export const Confirmation = (props: ConfirmationProps): JSX.Element => {
  const {confirmation, animationType = 'slide', closeConfirmation, ...other} = props;
  const theme = useTheme();
  const [appTheme] = useAppTheme();
  const backgroundColor = appTheme.theme === 'dark' ? theme.colors.onSurface : theme.colors.surface;
  const textColor = appTheme.theme === 'dark' ? theme.colors.surface : theme.colors.onSurface;

  return (
    <Modal
      visible={confirmation.open}
      transparent
      animationType={animationType}
      supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      onRequestClose={closeConfirmation}
      {...other}>
      <>
        <View style={styles.container}>
          <Blur />
          <Surface style={[styles.messageBox, {backgroundColor}]}>
            <Text style={[styles.message, {color: textColor}]} type='p'>
              {confirmation.message}
            </Text>
            <Divider />
            <View row>
              {confirmation.buttons.map((button, index) => (
                <View flex={1} key={button.text}>
                  <Pressable
                    onPress={() => {
                      closeConfirmation();
                      !button.onPress || button.onPress();
                    }}
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          (button.type || 'INFO') === 'INFO' ? backgroundColor : getColor(button.type, appTheme),
                      },
                      index === 0 ? styles.firstButton : {},
                      index === confirmation.buttons.length - 1 ? styles.lastButton : {},
                    ]}>
                    <Text
                      style={[
                        styles.buttonText,
                        {color: (button.type || 'INFO') === 'INFO' ? textColor : backgroundColor},
                      ]}>
                      {button.text}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </Surface>
        </View>
      </>
    </Modal>
  );
};
