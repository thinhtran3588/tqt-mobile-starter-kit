import {Models} from '@rematch/core';
import {internetConnection, loading} from '@app/core';
import {settings} from '@settings/models';
import {signIn} from '@auth/models';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
  internetConnection: typeof internetConnection;
  loading: typeof loading;
  signIn: typeof signIn;
}

export const models: RootModel = {
  settings,
  internetConnection,
  loading,
  signIn,
};
