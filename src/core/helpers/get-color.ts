import {ColorType, AppThemeState} from '../contexts/app-theme.context';

export const getColor = (type: ColorType = 'SUCCESS', theme: AppThemeState): string => {
  let color: string = theme.colors.success;
  if (type === 'ERROR') {
    color = theme.colors.error;
  } else if (type === 'WARNING') {
    color = theme.colors.warning;
  } else if (type === 'INFO') {
    color = theme.colors.info;
  } else if (type === 'PRIMARY') {
    color = theme.colors.primary;
  }
  return color;
};
