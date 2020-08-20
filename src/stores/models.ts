import {Models} from '@rematch/core';
import {theme, internetConnection, loading} from '@core/models';
import {signIn} from '@auth/models';
import {settings} from '@settings/models';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
  theme: typeof theme;
  internetConnection: typeof internetConnection;
  loading: typeof loading;
  signIn: typeof signIn;
}

export const models: RootModel = {
  settings,
  theme,
  internetConnection,
  loading,
  signIn,
};
