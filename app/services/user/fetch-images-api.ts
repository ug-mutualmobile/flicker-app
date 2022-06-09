import api from '..';
import { API_KEY } from '../../assets/contants';
import SnackbarCell from '../../components/snack-bar';
import checkNetwork from '../utils/check-network';

export const fetchImagesApi = async (searchValue: string, page: string) => {
  if (await checkNetwork()) {
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
  } else {
    SnackbarCell('Check your network');
  }
};
