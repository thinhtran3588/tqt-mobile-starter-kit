import merge from 'lodash/merge';
import {DeepPartial} from 'utility-types';
import defaultConfig from './config.json';
import overrideConfig from './config.override.json';

const appConfig = merge(defaultConfig, overrideConfig);

export const updateConfig = (newConfig: DeepPartial<typeof appConfig>): void => {
  merge(appConfig, newConfig);
};

export const appVersion = (): string => `${appConfig.appInfo.version}.${appConfig.appInfo.build}`;

export const config = (): typeof appConfig => appConfig;
