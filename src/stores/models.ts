import {Models} from '@rematch/core';
import {language, theme, internetConnection, loading} from '@core/models';
import {signIn} from '@auth/models';

export interface RootModel extends Models<RootModel> {
  language: typeof language;
  theme: typeof theme;
  internetConnection: typeof internetConnection;
  loading: typeof loading;
  signIn: typeof signIn;
}

export const models: RootModel = {
  language,
  theme,
  internetConnection,
  loading,
  signIn,
};
