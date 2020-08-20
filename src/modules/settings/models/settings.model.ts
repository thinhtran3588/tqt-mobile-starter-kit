import {createModel} from '@rematch/core';
import {ColorSchemeName} from 'react-native';
import {config, logEvent, COLORS_LOOKUP, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@app/core';
import {RootModel, Dispatch} from '@app/stores';
import {EVENT_NAME} from '@app/app.constants';

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

export interface SettingsState {
  language: string;
  theme: ThemeState;
}

// default state
const state: SettingsState = {
  language: config().defaultLang,
  theme: {
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
  },
};

const setLanguage = (draft: SettingsState, language: string): SettingsState => {
  draft.language = language;
  return draft;
};

const setLanguageI18n = (dispatch: Dispatch) => async (language: string): Promise<void> => {
  dispatch.settings.setLanguage(language);
  logEvent(EVENT_NAME.CHANGE_LANGUAGE, {language});
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

const setUseSystemTheme = (draft: SettingsState, useSystemTheme: boolean): SettingsState => {
  draft.theme.useSystemTheme = useSystemTheme;
  updateTheme(draft.theme);
  return draft;
};

const setDarkMode = (draft: SettingsState, darkMode: boolean): SettingsState => {
  draft.theme.darkMode = darkMode;
  updateTheme(draft.theme);
  return draft;
};

const setColorScheme = (draft: SettingsState, colorScheme: ColorSchemeName): SettingsState => {
  draft.theme.colorScheme = colorScheme === 'dark' ? 'dark' : 'light';
  updateTheme(draft.theme);
  return draft;
};

const setPrimaryColorBase = (draft: SettingsState, primaryColor: string): SettingsState => {
  draft.theme.primaryColor = primaryColor;
  updateTheme(draft.theme);
  return draft;
};

const setPrimaryColor = (dispatch: Dispatch) => async (primaryColor: string): Promise<void> => {
  dispatch.settings.setPrimaryColorBase(primaryColor);
  logEvent(EVENT_NAME.CHANGE_PRIMARY_COLOR, {primaryColor});
};

export const settings = createModel<RootModel>()({
  state,
  reducers: {
    setLanguage,
    setUseSystemTheme,
    setDarkMode,
    setPrimaryColorBase,
    setColorScheme,
  },
  effects: (dispatch) => ({
    setLanguageI18n: setLanguageI18n(dispatch),
    setPrimaryColor: setPrimaryColor(dispatch),
  }),
});
