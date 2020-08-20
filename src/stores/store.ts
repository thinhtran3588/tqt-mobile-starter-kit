import {init, RematchDispatch, RematchRootState, RematchStore} from '@rematch/core';
import storage from '@react-native-community/async-storage';
import immerPlugin from '@rematch/immer';
import persistPlugin from '@rematch/persist';
import {persistStore} from 'redux-persist';
import {models, RootModel} from './models';

export type Store = RematchStore<RootModel>;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'theme'],
  version: 1,
};

export const store: Store = init({
  models,
  plugins: [immerPlugin(), persistPlugin(persistConfig)],
});

export const persistor = persistStore(store);
