import Toast, {ToastOptions} from 'react-native-root-toast';
import {getColor} from '@core/helpers';
import {ColorType, LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR} from '@core/constants';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';

export interface NotificationParams extends ToastOptions {
  message: string;
  type?: ColorType;
}

export const useNotification = (): {showNotification: (params: NotificationParams) => void} => {
  const theme = useSelector((state: RootState) => state.theme);
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

      const textColor: string = theme.theme === 'light' ? LIGHT_BACKGROUND_COLOR : DARK_BACKGROUND_COLOR;
      const backgroundColor = getColor(type, theme);

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
    [theme],
  );
  return {showNotification};
};
