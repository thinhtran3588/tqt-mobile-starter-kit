import {Models} from '@rematch/core';
import {language} from '@core/models';

export interface RootModel extends Models<RootModel> {
  language: typeof language;
}

export const models: RootModel = {
  language,
};
