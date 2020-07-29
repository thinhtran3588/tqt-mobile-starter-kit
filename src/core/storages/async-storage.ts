import AsyncStorage from '@react-native-community/async-storage';

const get = async <T = string | Object>(key: string, needDeserialized: boolean = true): Promise<T | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      return undefined;
    }
    return value && needDeserialized ? JSON.parse(value) : value;
  } catch (e) {
    // saving error
    return undefined;
  }
};

const set = async <T = string | Object>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    // getting error
  }
};

const remove = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // getting error
  }
};

export const storage = {
  get,
  set,
  remove,
};
