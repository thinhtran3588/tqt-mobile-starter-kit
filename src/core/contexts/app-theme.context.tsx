import React, {useState, useContext} from 'react';
import {useImmer} from 'use-immer';

interface AppThemeProviderProps {
  children?: React.ReactNode;
}

interface AppThemeState {
  useSystemTheme: boolean;
  darkMode: boolean;
}

interface Dispatch {
  setUseSystemTheme: (useSystemTheme: boolean) => void;
  setDarkMode: (dark: boolean) => void;
}

const DEFAULT_APP_THEME: AppThemeState = {
  useSystemTheme: true,
  darkMode: false,
};

const AppThemeContext = React.createContext(DEFAULT_APP_THEME);
const AppThemeDispatchContext = React.createContext<Dispatch>({
  setUseSystemTheme: () => {},
  setDarkMode: () => {},
});

const AppThemeProvider = (props: AppThemeProviderProps): JSX.Element => {
  const {children} = props;
  const [theme, setTheme] = useImmer(DEFAULT_APP_THEME);
  const [dispatch] = useState<Dispatch>({
    setUseSystemTheme: (useSystemTheme) => {
      setTheme((draft) => {
        draft.useSystemTheme = useSystemTheme;
      });
    },
    setDarkMode: (dark) => {
      setTheme((draft) => {
        draft.darkMode = dark;
      });
    },
  });
  return (
    <AppThemeContext.Provider value={theme}>
      <AppThemeDispatchContext.Provider value={dispatch}>{children}</AppThemeDispatchContext.Provider>
    </AppThemeContext.Provider>
  );
};

const useAppTheme = (): [AppThemeState, Dispatch] => {
  const theme = useContext(AppThemeContext);
  const dispatch = useContext(AppThemeDispatchContext);
  if (theme === undefined) {
    throw new Error('useAppTheme must be used within a AppThemeProvider');
  }
  return [theme, dispatch];
};

export {AppThemeProvider, useAppTheme};
