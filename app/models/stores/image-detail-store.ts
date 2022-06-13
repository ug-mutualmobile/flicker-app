import { types } from 'mobx-state-tree';
import { rootStore } from './root-store';

export const ImageDetailStore = types
  .model('ImageDetailStore')
  .props({})
  .views(() => {
    return {
      getImageDetails(id: string) {
        const imageDetails = rootStore.userStore
          .getSearchResult()
          .find(item => item.id === id);

        return imageDetails;
      },
    };
  });

export const ImageDetailStoreInitialState = {};
