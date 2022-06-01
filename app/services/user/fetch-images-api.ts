import api from '..';
import { API_KEY } from '../../assets/contants';
import { Slugs } from '../utils/slugs';

export const fetchImagesApi = async (searchValue: string, page: string) => {
  const ApiUrl = `?${Slugs.method}&api_key=${API_KEY}&tags=${searchValue}&text=${searchValue}&${Slugs.format}&${Slugs.nojsoncallback}&${Slugs.perpage}&page=${page}`;
  const response = await api.get(ApiUrl);
  return response;
};
