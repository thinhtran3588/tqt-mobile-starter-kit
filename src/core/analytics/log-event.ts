/* eslint-disable @typescript-eslint/no-explicit-any */
import analytics from '@react-native-firebase/analytics';

export const logEvent = async (name: string, data?: {[key: string]: any}): Promise<void> => {
  try {
    await analytics().logEvent(name, data);
  } catch (err) {
    // ignore error
  }
};
