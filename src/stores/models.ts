import {Models} from '@rematch/core';
import {language, theme} from '@core/models';

export interface RootModel extends Models<RootModel> {
  language: typeof language;
  theme: typeof theme;
}

export const models: RootModel = {
  language,
  theme,
};
