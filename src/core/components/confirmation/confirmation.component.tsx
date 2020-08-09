/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ModalProps, Modal, Pressable} from 'react-native';
import {Divider, useTheme, Surface} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {getColor} from '@core/helpers';
import {useAppTheme, ConfirmationState} from '@core/contexts';
import {View} from '../view/view.component';
import {Text} from '../text/text.component';
import {Blur} from '../blur/blur.component';
import {styles} from './confirmation.styles';

export interface ConfirmationProps extends ModalProps {
  confirmation: ConfirmationState;
  closeConfirmation: () => void;
}

export const Confirmation = (props: ConfirmationProps): JSX.Element => {
  const {t} = useTranslation();
  const {confirmation, animationType = 'slide', closeConfirmation, ...other} = props;
  const titleType = confirmation.titleType || 'INFO';
  let {title} = confirmation;
  if (!title) {
    switch (titleType) {
      case 'ERROR':
        title = t('common:error');
        break;
      case 'WARNING':
        title = t('common:warning');
        break;
      default:
        title = t('common:confirmation');
    }
  }
  const theme = useTheme();
  const {appTheme} = useAppTheme();

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
          <Surface style={[styles.messageBox]}>
            {confirmation.showTitle && (
              <View
                style={[
                  styles.titleContainer,
                  {
                    backgroundColor: titleType === 'INFO' ? undefined : getColor(titleType, appTheme),
                  },
                ]}>
                <Text
                  style={[styles.titleText, !titleType || titleType === 'INFO' ? {} : {color: theme.colors.surface}]}
                  type='h6'>
                  {title}
                </Text>
                <Divider />
              </View>
            )}
            <Text style={[styles.message]} type='p'>
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
                          (button.type || 'INFO') === 'INFO' ? undefined : getColor(button.type, appTheme),
                      },
                      index === 0 ? styles.firstButton : {},
                      index === confirmation.buttons.length - 1 ? styles.lastButton : {},
                    ]}>
                    <Text
                      style={[
                        styles.buttonText,
                        !button.type || button.type === 'INFO' ? {} : {color: theme.colors.surface},
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
