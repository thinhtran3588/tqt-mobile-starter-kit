import {Models} from '@rematch/core';
import {internetConnection, loading} from '@app/core';
import {settings} from '@settings/models';
import {signIn, auth} from '@auth/models';

export interface RootModel extends Models<RootModel> {
  loading: typeof loading;
  internetConnection: typeof internetConnection;
  settings: typeof settings;
  auth: typeof auth;
  signIn: typeof signIn;
}

export const models: RootModel = {
  settings,
  internetConnection,
  loading,
  auth,
  signIn,
};
