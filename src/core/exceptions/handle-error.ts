import {TFunction} from 'i18next';
import {AppError} from './app-error';
import {showNotification} from '../helpers';

export const handleError = (err: AppError, t: TFunction): void => {
  const {code, messageCode, messageData} = err;
  showNotification({
    message: messageCode ? t(messageCode, messageData) : code || t('common:unknownError'),
    type: 'ERROR',
  });
};
