import { types, Instance } from 'mobx-state-tree';
import React, { createContext } from 'react';
import {
  ImageDetailStore,
  ImageDetailStoreInitialState,
} from './image-detail-store';
import { UserStore, UserStoreInitialState } from './user-store';

export const rootStore = types
  .model({
    userStore: UserStore,
    imageDetailStore: ImageDetailStore,
  })
  .create({
    userStore: UserStoreInitialState,
    imageDetailStore: ImageDetailStoreInitialState,
  });

export function useStore() {
  const store = React.useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);
export const StoreProvider = RootStoreContext.Provider;
