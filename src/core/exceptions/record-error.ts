import * as Sentry from '@sentry/react-native';
import {config} from '../config';

if (!__DEV__) {
  Sentry.init({
    dsn: config().sentry.dns,
  });
}

export interface ConfigErrorParams {
  userId: string;
}

export const configError = (params: ConfigErrorParams): void => {
  const {userId} = params;
  if (!__DEV__) {
    Sentry.setUser({id: userId});
  }
};

export const recordError = async (err: Error): Promise<void> => {
  if (!__DEV__) {
    Sentry.captureException(err);
  } else {
    // eslint-disable-next-line no-console
    console.log('record err', err);
  }
};
