import analytics from '@react-native-firebase/analytics';

export const trackScreen = async (screenName: string): Promise<void> => {
  try {
    await analytics().setCurrentScreen(screenName, screenName);
  } catch (err) {
    // ignore error
  }
};
