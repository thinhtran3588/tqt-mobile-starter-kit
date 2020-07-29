import {storage} from '@core/storages';
import {useEffect} from 'react';

export const usePersistence = <T>(
  state: T,
  setState: (newState: T) => void,
  key: string,
  needDeserialized: boolean = true,
): [(state: T) => void] => {
  const setStatePersistence = (newState: T): void => {
    setState(newState);
    storage.set(key, newState);
  };
  useEffect(() => {
    (async () => {
      const storageState = await storage.get<T>(key, needDeserialized);
      if (storageState && storageState !== state) {
        setState(storageState);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [setStatePersistence];
};

export const usePersistenceImmer = <T>(
  state: T,
  setState: (f: (draft: T) => void | T) => void,
  key: string,
  needDeserialized: boolean = true,
): [(f: (draft: T) => void | T) => void] => {
  const setStatePersistence = (func: (draft: T) => void | T): void => {
    const overrideFunc = (draft: T): void | T => {
      const result = func(draft);
      if (typeof result !== 'undefined') {
        storage.set(key, result);
      } else {
        storage.set(key, draft);
      }
    };
    setState(overrideFunc);
  };
  useEffect(() => {
    (async () => {
      const storageState = await storage.get<T>(key, needDeserialized);
      if (storageState && storageState !== state) {
        setState(() => storageState);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [setStatePersistence];
};
