import { types } from 'mobx-state-tree';
import { UserSearchModel } from './user-search-model';

const ImageDetailModel = types
  .model({
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

        UserSearchModel.getSearchResult().forEach(item => {
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

export const UserImageDetailModel = ImageDetailModel.create({
  id: '',
});
