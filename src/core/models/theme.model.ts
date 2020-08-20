import {createModel} from '@rematch/core';
import {ColorSchemeName} from 'react-native';
import {RootModel, Dispatch} from '@app/stores';
import {logEvent} from '@app/core/analytics';
import {EVENT_NAME} from '@app/app.constants';
import {config} from '@core/config';
import {COLORS_LOOKUP, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@core/constants';

export interface ThemeState {
  useSystemTheme: boolean;
  darkMode: boolean;
  primaryColor: string;
  colorScheme: 'dark' | 'light';
  theme: 'dark' | 'light';
  colors: {
    primary: string;
    warning: string;
    error: string;
    success: string;
    info: string;
  };
}

// default state
const state: ThemeState = {
  useSystemTheme: true,
  darkMode: false,
  primaryColor: config().defaultPrimaryColor,
  theme: 'light',
  colorScheme: 'light',
  colors: {
    primary: COLORS_LOOKUP[config().defaultPrimaryColor].color,
    warning: COLORS_LOOKUP.ORANGE.color,
    error: COLORS_LOOKUP.RED.color,
    success: COLORS_LOOKUP.GREEN.color,
    info: DARK_BACKGROUND_COLOR,
  },
};

const updateTheme = (draft: ThemeState): void => {
  if (draft.useSystemTheme) {
    draft.theme = draft.colorScheme === 'dark' ? 'dark' : 'light';
  } else {
    draft.theme = draft.darkMode ? 'dark' : 'light';
  }
  if (draft.theme === 'light') {
    draft.colors.success = COLORS_LOOKUP.GREEN.color;
    draft.colors.warning = COLORS_LOOKUP.ORANGE.color;
    draft.colors.error = COLORS_LOOKUP.RED.color;
    draft.colors.info = DARK_BACKGROUND_COLOR;
    draft.colors.primary = COLORS_LOOKUP[draft.primaryColor].color;
  } else {
    draft.colors.success = COLORS_LOOKUP.GREEN.darkColor;
    draft.colors.warning = COLORS_LOOKUP.ORANGE.darkColor;
    draft.colors.error = COLORS_LOOKUP.RED.darkColor;
    draft.colors.info = LIGHT_BACKGROUND_COLOR;
    draft.colors.primary = COLORS_LOOKUP[draft.primaryColor].darkColor;
  }
};

const setUseSystemTheme = (draft: ThemeState, useSystemTheme: boolean): ThemeState => {
  draft.useSystemTheme = useSystemTheme;
  updateTheme(draft);
  return draft;
};

const setDarkMode = (draft: ThemeState, darkMode: boolean): ThemeState => {
  draft.darkMode = darkMode;
  updateTheme(draft);
  return draft;
};

const setColorScheme = (draft: ThemeState, colorScheme: ColorSchemeName): ThemeState => {
  draft.colorScheme = colorScheme === 'dark' ? 'dark' : 'light';
  updateTheme(draft);
  return draft;
};

const setPrimaryColorBase = (draft: ThemeState, primaryColor: string): ThemeState => {
  draft.primaryColor = primaryColor;
  updateTheme(draft);
  return draft;
};

const setPrimaryColor = (dispatch: Dispatch) => async (primaryColor: string): Promise<void> => {
  dispatch.theme.setPrimaryColorBase(primaryColor);
  logEvent(EVENT_NAME.CHANGE_PRIMARY_COLOR, {primaryColor});
};

export const theme = createModel<RootModel>()({
  state,
  reducers: {
    setUseSystemTheme,
    setDarkMode,
    setPrimaryColorBase,
    setColorScheme,
  },
  effects: (dispatch) => ({
    setPrimaryColor: setPrimaryColor(dispatch),
  }),
});
