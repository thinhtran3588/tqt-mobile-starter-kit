import Toast, {ToastOptions} from 'react-native-root-toast';
import {COLORS_LOOKUP, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '../contexts';

type NotificationType = 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';

export interface NotificationParams extends ToastOptions {
  message: string;
  type?: NotificationType;
}

export interface NotificationTheme {
  theme: 'dark' | 'light';
  warning: string;
  error: string;
  success: string;
}

interface LastMessage {
  message: string;
  timestamp: number;
  type: NotificationType;
}

let notificationTheme: NotificationTheme = {
  theme: 'light',
  warning: COLORS_LOOKUP.ORANGE.color,
  error: COLORS_LOOKUP.RED.color,
  success: COLORS_LOOKUP.GREEN.color,
};

export const setNotificationTheme = (theme: 'dark' | 'light'): void => {
  if (theme === 'light') {
    notificationTheme = {
      theme: 'light',
      warning: COLORS_LOOKUP.ORANGE.color,
      error: COLORS_LOOKUP.RED.color,
      success: COLORS_LOOKUP.GREEN.color,
    };
  } else {
    notificationTheme = {
      theme: 'light',
      warning: COLORS_LOOKUP.ORANGE.darkColor,
      error: COLORS_LOOKUP.RED.darkColor,
      success: COLORS_LOOKUP.GREEN.darkColor,
    };
  }
};

export const showNotification = (params: NotificationParams): void => {
  const {
    message,
    type = 'SUCCESS',
    duration = Toast.durations.SHORT,
    position = Toast.positions.TOP,
    delay = 0,
    ...other
  } = params;

  let backgroundColor: string = notificationTheme.theme === 'dark' ? LIGHT_BACKGROUND_COLOR : DARK_BACKGROUND_COLOR;
  const textColor: string = LIGHT_BACKGROUND_COLOR;
  if (type === 'SUCCESS') {
    backgroundColor = notificationTheme.success;
  } else if (type === 'WARNING') {
    backgroundColor = notificationTheme.warning;
  } else if (type === 'ERROR') {
    backgroundColor = notificationTheme.error;
  }

  Toast.show(message, {
    ...other,
    duration,
    position,
    delay,
    backgroundColor,
    textColor,
    containerStyle: {
      top: 30,
      borderRadius: 20,
    },
    opacity: 0.9,
  });
};
