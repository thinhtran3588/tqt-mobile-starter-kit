/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ModalProps, Modal, Pressable} from 'react-native';
import {Divider, useTheme, Surface} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
import {ColorType} from '../../constants';
import {getColor} from '../../helpers';
import {View} from '../view/view.component';
import {Text} from '../text/text.component';
import {Blur} from '../blur/blur.component';
import {styles} from './confirmation.styles';

export interface ConfirmationButton {
  text: string;
  onPress?: () => void;
  type?: ColorType;
}

export interface ConfirmationProps extends ModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  buttons: ConfirmationButton[];
  title?: string;
  titleType?: ColorType;
  showTitle?: boolean;
}

export const Confirmation = (props: ConfirmationProps): JSX.Element => {
  const {t} = useTranslation();
  const {
    message,
    buttons,
    title,
    titleType = 'INFO',
    showTitle = true,
    open,
    onClose,
    animationType = 'slide',
    ...other
  } = props;
  let headerTitle = title;
  if (!title) {
    switch (titleType) {
      case 'ERROR':
        headerTitle = t('common:error');
        break;
      case 'WARNING':
        headerTitle = t('common:warning');
        break;
      default:
        headerTitle = t('common:confirmation');
    }
  }
  const paperTheme = useTheme();
  const theme = useSelector((state: RootState) => state.settings.theme);

  return (
    <>
      {open && (
        <Modal
          visible={open}
          transparent
          animationType={animationType}
          supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
          onRequestClose={onClose}
          {...other}>
          <>
            <View style={styles.container}>
              <Blur />
              <Surface style={[styles.messageBox]}>
                {showTitle && (
                  <View
                    style={[
                      styles.titleContainer,
                      {
                        backgroundColor: titleType === 'INFO' ? undefined : getColor(titleType, theme),
                      },
                    ]}>
                    <Text
                      style={[
                        styles.titleText,
                        !titleType || titleType === 'INFO' ? {} : {color: paperTheme.colors.surface},
                      ]}
                      type='h6'>
                      {headerTitle}
                    </Text>
                    <Divider />
                  </View>
                )}
                <Text style={[styles.message]} type='p'>
                  {message}
                </Text>
                <Divider />
                <View row>
                  {buttons.map((button, index) => (
                    <View flex={1} key={button.text}>
                      <Pressable
                        onPress={() => {
                          onClose();
                          !button.onPress || button.onPress();
                        }}
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              (button.type || 'INFO') === 'INFO' ? undefined : getColor(button.type, theme),
                          },
                          index === 0 ? styles.firstButton : {},
                          index === buttons.length - 1 ? styles.lastButton : {},
                        ]}>
                        <Text
                          style={[
                            styles.buttonText,
                            !button.type || button.type === 'INFO' ? {} : {color: paperTheme.colors.surface},
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
      )}
    </>
  );
};
