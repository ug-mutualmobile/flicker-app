import { types } from 'mobx-state-tree';
import { rootStore } from './root-store';

export const ImageDetailStore = types
  .model('ImageDetailStore')
  .props({})
  .views(() => {
    return {
      getImageDetails(id: string) {
        let imageDetails = {
          id: id,
          title: '',
          server: '',
          secret: '',
        };

        rootStore.userStore.getSearchResult().forEach(item => {
          if (id && item.id === id) {
            imageDetails = {
              id: id,
              title: item.title,
              server: item.server,
              secret: item.secret,
            };
          }
        });

        return imageDetails;
      },
    };
  });

export const ImageDetailStoreInitialState = {};
