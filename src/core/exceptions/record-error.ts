import * as Sentry from '@sentry/react-native';

export interface ConfigErrorParams {
  userId: string;
}

export const configError = (params: ConfigErrorParams): void => {
  const {userId} = params;
  Sentry.setUser({id: userId});
};

export const recordError = async (err: Error): Promise<void> => {
  Sentry.captureException(err);

  // eslint-disable-next-line no-console
  console.log('record err', err);
};
