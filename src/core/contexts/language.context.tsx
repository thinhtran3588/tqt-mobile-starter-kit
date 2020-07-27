import React, {useState, useContext} from 'react';

interface LanguageProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (Language: string) => void;

export const DEFAULT_LANGUAGE = 'en';

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
  return (
    <LanguageContext.Provider value={language}>
      <LanguageDispatchContext.Provider value={setLanguage}>{children}</LanguageDispatchContext.Provider>
    </LanguageContext.Provider>
  );
};

const useLanguage = (): [string, Dispatch] => {
  const Language = useContext(LanguageContext);
  const setLanguage = useContext(LanguageDispatchContext);
  return [Language, setLanguage];
};

export {LanguageProvider, useLanguage};
