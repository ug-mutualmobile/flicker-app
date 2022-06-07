import api from '..';
import { API_KEY } from '../../assets/contants';

export const fetchImagesApi = async (searchValue: string, page: string) => {
  const ApiUrl = `?api_key=${API_KEY}&tags=${searchValue}&text=${searchValue}&page=${page}`;
  const response = await api.get(ApiUrl, {
    params: {
      method: 'flickr.photos.search',
      format: 'json',
      nojsoncallback: '1',
      perpage: '10',
    },
  });
  return response;
};
