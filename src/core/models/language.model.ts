import {createModel} from '@rematch/core';
import {RootModel, Dispatch} from '@app/stores';
import {logEvent} from '@app/core/analytics';
import {EVENT_NAME} from '@app/app.constants';
import {config} from '@core/config';

// default state
const state = config().defaultLang;

const setLanguage = (_draft: string, lang: string): string => {
  return lang;
};

const setLanguageI18n = (dispatch: Dispatch) => async (lang: string): Promise<void> => {
  dispatch.language.setLanguage(lang);
  logEvent(EVENT_NAME.CHANGE_LANGUAGE, {language: lang});
};

export const language = createModel<RootModel>()({
  state,
  reducers: {
    setLanguage,
  },
  effects: (dispatch) => ({
    setLanguageI18n: setLanguageI18n(dispatch),
  }),
});
