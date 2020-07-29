import React, {useState, useContext} from 'react';
import {usePersistence} from '@core/hooks';

interface LanguageProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (Language: string) => void;

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
  return (
    <LanguageContext.Provider value={language}>
      <LanguageDispatchContext.Provider value={setLanguagePersistence}>{children}</LanguageDispatchContext.Provider>
    </LanguageContext.Provider>
  );
};

const useLanguage = (): [string, Dispatch] => {
  const Language = useContext(LanguageContext);
  const setLanguage = useContext(LanguageDispatchContext);
  return [Language, setLanguage];
};

export {LanguageProvider, useLanguage};
