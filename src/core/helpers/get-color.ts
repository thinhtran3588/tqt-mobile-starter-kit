import {ThemeState} from '@core/models';
import {ColorType} from '@core/constants';

export const getColor = (type: ColorType = 'SUCCESS', theme: ThemeState): string => {
  let color: string;
  switch (type) {
    case 'ERROR':
      color = theme.colors.error;
      break;
    case 'WARNING':
      color = theme.colors.warning;
      break;
    case 'INFO':
      color = theme.colors.info;
      break;
    case 'PRIMARY':
      color = theme.colors.primary;
      break;
    default:
      color = theme.colors.success;
  }
  return color;
};
