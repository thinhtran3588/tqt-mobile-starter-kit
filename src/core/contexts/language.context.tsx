import React, {useState, useContext, useCallback} from 'react';
import {usePersistence} from '@core/hooks/use-persistence';
import {EVENT_NAME} from '@app/app.constants';
import {logEvent} from '../analytics';

interface LanguageProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (language: string) => void;

export const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_STORAGE_KEY = 'LANGUAGE';

export const LANGUAGES = [
  {
    code: 'en',
    text: 'English',
  },
  {
    code: 'vi',
    text: 'Tiếng Việt',
  },
];

const LanguageContext = React.createContext(DEFAULT_LANGUAGE);
const LanguageDispatchContext = React.createContext<Dispatch>(undefined as never);

const LanguageProvider = (props: LanguageProviderProps): JSX.Element => {
  const {children} = props;
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [setLanguagePersistence] = usePersistence(language, setLanguage, LANGUAGE_STORAGE_KEY, false);

  const changeLanguage = useCallback(
    (newLanguage: string) => {
      setLanguagePersistence(newLanguage);
      logEvent(EVENT_NAME.CHANGE_LANGUAGE, {language: newLanguage});
    },
    [setLanguagePersistence],
  );

  return (
    <LanguageContext.Provider value={language}>
      <LanguageDispatchContext.Provider value={changeLanguage}>{children}</LanguageDispatchContext.Provider>
    </LanguageContext.Provider>
  );
};

const useLanguage = (): {language: string; setLanguage: Dispatch} => {
  const language = useContext(LanguageContext);
  const setLanguage = useContext(LanguageDispatchContext);
  return {language, setLanguage};
};

export {LanguageProvider, useLanguage};
