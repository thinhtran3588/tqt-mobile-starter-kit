import React, {useContext, useEffect, useMemo} from 'react';
import {useImmer} from 'use-immer';
import {useColorScheme} from 'react-native';
import {usePersistenceImmer} from '@core/hooks';
import {Colors} from 'react-native-paper';

interface AppThemeProviderProps {
  children?: React.ReactNode;
}

interface AppThemeState {
  useSystemTheme: boolean;
  darkMode: boolean;
  theme: 'light' | 'dark';
  primaryColorId: string;
  primaryColor: string;
}

interface Dispatch {
  setUseSystemTheme: (useSystemTheme: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  setPrimaryColor: (primaryColor: string) => void;
}

interface Color {
  id: string;
  color: string;
  darkColor: string;
  text: string;
}

export const COLORS_LOOKUP: {[id: string]: Color} = {
  AMBER: {
    id: 'AMBER',
    color: Colors.amber500,
    darkColor: Colors.amber300,
    text: 'Amber',
  },
  BLUE: {
    id: 'BLUE',
    color: Colors.blue500,
    darkColor: Colors.blue300,
    text: 'Blue',
  },
  BLUE_GREY: {
    id: 'BLUE_GREY',
    color: Colors.blueGrey500,
    darkColor: Colors.blueGrey300,
    text: 'Blue Grey',
  },
  BROWN: {
    id: 'BROWN',
    color: Colors.brown500,
    darkColor: Colors.brown300,
    text: 'Brown',
  },
  CYAN: {
    id: 'CYAN',
    color: Colors.cyan500,
    darkColor: Colors.cyan300,
    text: 'Cyan',
  },
  DEEP_ORANGE: {
    id: 'DEEP_ORANGE',
    color: Colors.deepOrange500,
    darkColor: Colors.deepOrange300,
    text: 'Deep Orange',
  },
  GREEN: {
    id: 'GREEN',
    color: Colors.green500,
    darkColor: Colors.green300,
    text: 'Green',
  },
  GREY: {
    id: 'GREY',
    color: Colors.grey500,
    darkColor: Colors.grey300,
    text: 'Grey',
  },
  INDIGO: {
    id: 'INDIGO',
    color: Colors.indigo500,
    darkColor: Colors.indigo300,
    text: 'Indigo',
  },
  LIGHT_BLUE: {
    id: 'LIGHT_BLUE',
    color: Colors.lightBlue500,
    darkColor: Colors.lightBlue300,
    text: 'Light Blue',
  },
  LIGHT_GREENS: {
    id: 'LIGHT_GREENS',
    color: Colors.lightGreen500,
    darkColor: Colors.lightGreen300,
    text: 'Light Green',
  },
  LIME: {
    id: 'LIME',
    color: Colors.lime500,
    darkColor: Colors.lime300,
    text: 'Lime',
  },
  ORANGE: {
    id: 'ORANGE',
    color: Colors.orange500,
    darkColor: Colors.orange300,
    text: 'Orange',
  },
  PINK: {
    id: 'PINK',
    color: Colors.pink500,
    darkColor: Colors.pink300,
    text: 'Pink',
  },
  PURPLE: {
    id: 'PURPLE',
    color: Colors.purple500,
    darkColor: Colors.purple300,
    text: 'Purple',
  },
  RED: {
    id: 'RED',
    color: Colors.red500,
    darkColor: Colors.red300,
    text: 'Red',
  },
  TEAL: {
    id: 'TEAL',
    color: Colors.teal500,
    darkColor: Colors.teal300,
    text: 'Teal',
  },
  YELLOW: {
    id: 'YELLOW',
    color: Colors.yellow500,
    darkColor: Colors.yellow300,
    text: 'Yellow',
  },
};
export const COLORS = Object.keys(COLORS_LOOKUP).map((key: string) => COLORS_LOOKUP[key]);

const DEFAULT_APP_THEME: AppThemeState = {
  useSystemTheme: true,
  darkMode: false,
  theme: 'light',
  primaryColorId: COLORS_LOOKUP.CYAN.id,
  primaryColor: COLORS_LOOKUP.CYAN.color,
};
export const LIGHT_BACKGROUND_COLOR = '#fff';
export const DARK_BACKGROUND_COLOR = '#272727';

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

  const dispatch = useMemo(
    (): Dispatch => ({
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
      setPrimaryColor: (primaryColor) => {
        setAppThemePersistence((draft) => {
          draft.primaryColorId = primaryColor;
          updateTheme(draft);
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
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
