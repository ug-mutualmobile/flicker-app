import { types } from 'mobx-state-tree';
import { rootStore } from './root-store';

export const ImageDetailStore = types
  .model('ImageDetailStore')
  .props({
    id: types.string,
  })
  .views(self => {
    return {
      getImageDetails() {
        let imageDetails = {
          id: self.id,
          title: '',
          server: '',
          secret: '',
        };

        rootStore.userStore.getSearchResult().forEach(item => {
          if (self.id && item.id === self.id) {
            imageDetails = {
              id: self.id,
              title: item.title,
              server: item.server,
              secret: item.secret,
            };
          }
        });

        return imageDetails;
      },
    };
  })
  .actions(self => {
    return {
      setImageId(id: string) {
        self.id = id;
      },
    };
  });

export const ImageDetailStoreInitialState = {
  id: '',
};
