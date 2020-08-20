import {Models} from '@rematch/core';
import {settings} from '@app/modules/settings/models';

export interface RootModel extends Models<RootModel> {
  settings: typeof settings;
}

export const models: RootModel = {
  settings,
};
