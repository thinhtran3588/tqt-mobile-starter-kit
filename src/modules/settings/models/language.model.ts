import {createModel} from '@rematch/core';
import {RootModel, Dispatch} from '@app/stores';
import {logEvent} from '@app/core/analytics';
import {EVENT_NAME} from '@app/app.constants';
import {config} from '@core/config';

export interface SettingsState {
  language: string;
}

// default state
const state: SettingsState = {
  language: config().defaultLang,
};

const setLanguage = (draft: SettingsState, language: string): SettingsState => {
  draft.language = language;
  return draft;
};

const setLanguageI18n = (dispatch: Dispatch) => async (language: string): Promise<void> => {
  dispatch.settings.setLanguage(language);
  logEvent(EVENT_NAME.CHANGE_LANGUAGE, {language});
};

export const settings = createModel<RootModel>()({
  state,
  reducers: {
    setLanguage,
  },
  effects: (dispatch) => ({
    setLanguageI18n: setLanguageI18n(dispatch),
  }),
});
