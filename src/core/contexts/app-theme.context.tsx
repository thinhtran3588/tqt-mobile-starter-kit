import React, {useState, useContext, useEffect} from 'react';
import {useImmer} from 'use-immer';
import {useColorScheme} from 'react-native';
import {usePersistence, usePersistenceImmer} from '@core/hooks';

interface AppThemeProviderProps {
  children?: React.ReactNode;
}

interface AppThemeState {
  useSystemTheme: boolean;
  darkMode: boolean;
  theme: 'light' | 'dark';
}

interface Dispatch {
  setUseSystemTheme: (useSystemTheme: boolean) => void;
  setDarkMode: (dark: boolean) => void;
}

const DEFAULT_APP_THEME: AppThemeState = {
  useSystemTheme: true,
  darkMode: false,
  theme: 'light',
};
const APP_THEME_KEY = 'APP_THEME';

const AppThemeContext = React.createContext(DEFAULT_APP_THEME);
const AppThemeDispatchContext = React.createContext<Dispatch>(undefined as never);

const AppThemeProvider = (props: AppThemeProviderProps): JSX.Element => {
  const {children} = props;
  const [appTheme, setAppTheme] = useImmer(DEFAULT_APP_THEME);
  const [setAppThemePersistence] = usePersistenceImmer(appTheme, setAppTheme, APP_THEME_KEY);
  const colorScheme = useColorScheme();

  const updateTheme = (draft: AppThemeState): void => {
    if (draft.useSystemTheme) {
      draft.theme = colorScheme === 'dark' ? 'dark' : 'light';
    } else {
      draft.theme = draft.darkMode ? 'dark' : 'light';
    }
  };

  useEffect(() => {
    setAppThemePersistence((draft) => {
      updateTheme(draft);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);

  const [dispatch] = useState<Dispatch>({
    setUseSystemTheme: (useSystemTheme) => {
      setAppThemePersistence((draft) => {
        draft.useSystemTheme = useSystemTheme;
        updateTheme(draft);
      });
    },
    setDarkMode: (dark) => {
      setAppThemePersistence((draft) => {
        draft.darkMode = dark;
        updateTheme(draft);
      });
    },
  });
  return (
    <AppThemeContext.Provider value={appTheme}>
      <AppThemeDispatchContext.Provider value={dispatch}>{children}</AppThemeDispatchContext.Provider>
    </AppThemeContext.Provider>
  );
};

const useAppTheme = (): [AppThemeState, Dispatch] => {
  const theme = useContext(AppThemeContext);
  const dispatch = useContext(AppThemeDispatchContext);
  return [theme, dispatch];
};

export {AppThemeProvider, useAppTheme};
