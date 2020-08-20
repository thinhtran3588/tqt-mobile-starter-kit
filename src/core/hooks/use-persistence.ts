import {useEffect, Dispatch, SetStateAction} from 'react';
import {storage} from '../storages';

export const usePersistence = <T>(
  state: T,
  setState: Dispatch<SetStateAction<T>>,
  key: string,
  needDeserialized: boolean = true,
): [Dispatch<SetStateAction<T>>] => {
  const setStatePersistence: Dispatch<SetStateAction<T>> = (newStateOrSetState) => {
    if (typeof newStateOrSetState === 'function') {
      setState((prevState) => {
        const newState = (newStateOrSetState as (prevState: T) => T)(prevState);
        storage.set(key, newState);
        return newState;
      });
    } else {
      setState(newStateOrSetState);
      storage.set(key, newStateOrSetState);
    }
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
