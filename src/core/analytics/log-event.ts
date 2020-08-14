/* eslint-disable @typescript-eslint/no-explicit-any */
import analytics from '@react-native-firebase/analytics';

type SignInType = 'EMAIL' | 'PHONE_NO' | 'FACEBOOK' | 'GOOGLE' | 'APPLE';
export interface ConfigAnalyticsParams {
  userId: string;
}
export const configAnalytics = async (params: ConfigAnalyticsParams): Promise<void> => {
  const {userId} = params;
  await analytics().setUserId(userId);
};

export const logEvent = async (name: string, data?: {[key: string]: any}): Promise<void> => {
  try {
    await analytics().logEvent(name, data);
  } catch (err) {
    // ignore error
  }
};

export const logAuthEvent = async (signType: 'SIGN_UP' | 'SIGN_IN', method: SignInType): Promise<void> => {
  try {
    if (signType === 'SIGN_UP') {
      await analytics().logSignUp({method});
    } else {
      await analytics().logLogin({method});
    }
  } catch (err) {
    // ignore error
  }
};
