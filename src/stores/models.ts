import {Models} from '@rematch/core';
import {internetConnection, loading, isLoadedFromStorage} from '@app/core';
import {settings} from '@settings/models';
import {signIn, auth} from '@auth/models';

export interface RootModel extends Models<RootModel> {
  isLoadedFromStorage: typeof isLoadedFromStorage;
  loading: typeof loading;
  internetConnection: typeof internetConnection;
  settings: typeof settings;
  auth: typeof auth;
  signIn: typeof signIn;
}

export const models: RootModel = {
  isLoadedFromStorage,
  settings,
  internetConnection,
  loading,
  auth,
  signIn,
};
