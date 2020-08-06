import Toast, {ToastOptions} from 'react-native-root-toast';
import {getColor} from '@core/helpers';
import {ColorType, LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR, useAppTheme} from '@core/contexts/app-theme.context';
import {useCallback} from 'react';

export interface NotificationParams extends ToastOptions {
  message: string;
  type?: ColorType;
}

export const useNotification = (): {showNotification: (params: NotificationParams) => void} => {
  const {appTheme} = useAppTheme();
  const showNotification = useCallback(
    (params: NotificationParams): void => {
      const {
        message,
        type = 'SUCCESS',
        duration = Toast.durations.SHORT,
        position = Toast.positions.TOP,
        delay = 0,
        ...other
      } = params;

      const textColor: string = appTheme.theme === 'light' ? LIGHT_BACKGROUND_COLOR : DARK_BACKGROUND_COLOR;
      const backgroundColor = getColor(type, appTheme);

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
        opacity: 1,
      });
    },
    [appTheme],
  );
  return {showNotification};
};
