import { types } from 'mobx-state-tree';
import { ImageDetailsInterface } from '../interfaces/image-detail.interface';

const ImageDetailModel = types
  .model({
    id: types.string,
    title: types.string,
    server: types.string,
    secret: types.string,
  })
  .views(self => {
    return {
      getImageDetails() {
        return {
          id: self.id,
          title: self.title,
          server: self.server,
          secret: self.secret,
        };
      },
    };
  })
  .actions(self => {
    return {
      setImageDetails(data: ImageDetailsInterface) {
        self.id = data.id;
        self.title = data.title;
        self.server = data.server;
        self.secret = data.secret;
      },
    };
  });

export const UserImageDetailModel = ImageDetailModel.create({
  id: '',
  title: '',
  server: '',
  secret: '',
});
