import {Models} from '@rematch/core';
import {language, theme, internetConnection} from '@core/models';

export interface RootModel extends Models<RootModel> {
  language: typeof language;
  theme: typeof theme;
  internetConnection: typeof internetConnection;
}

export const models: RootModel = {
  language,
  theme,
  internetConnection,
};
