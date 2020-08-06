import crashlytics from '@react-native-firebase/crashlytics';

export interface ConfigErrorParams {
  userId: string;
}

export const configError = (params: ConfigErrorParams): void => {
  const {userId} = params;
  crashlytics().setUserId(userId);
};

export const recordError = async (err: Error): Promise<void> => {
  crashlytics().recordError(err);
  // eslint-disable-next-line no-console
  console.log('record err', err);
};
