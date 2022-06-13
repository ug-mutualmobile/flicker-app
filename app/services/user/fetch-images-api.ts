import api from '..';
import { API_KEY } from '../../assets/contants';

export const fetchImagesApi = async (searchValue: string, page: string) => {
  return await api.get('', {
    params: {
      api_key: API_KEY,
      tags: searchValue,
      text: searchValue,
      page: page,
      method: 'flickr.photos.search',
      format: 'json',
      nojsoncallback: '1',
      perpage: '10',
    },
  });
};
