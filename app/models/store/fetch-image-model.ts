import { types } from 'mobx-state-tree';
import { fetchImages } from '../../api/api-handler';
import { FetchImageInterface } from '../interfaces/fetch-image-interface';

const FetchImageModel = types.model({}).actions(() => {
  return {
    fetchImageAction(data: FetchImageInterface) {
      fetchImages(data.searchValue, data.page);
    },
  };
});

export const FetchImageApiModel = FetchImageModel.create({});
