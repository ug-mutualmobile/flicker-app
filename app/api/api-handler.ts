import axios from 'axios';
import { API_KEY, BASE_URL } from '../assets/contants';
import SnackbarCell from '../components/snackbar';
import { UserSearchModel } from '../models/store/search-model';

export const fetchImages = async (searchValue: string, page: string) => {
  const ApiUrl = `?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&text=${searchValue}&format=json&nojsoncallback=1&per_page=10&page=${page}`;
  UserSearchModel.setSearchValue(searchValue);
  UserSearchModel.setIsSearching(true);
  let cancelToken: any;

  if (typeof cancelToken !== typeof undefined) {
    cancelToken.cancel('Canceling the previous req');
  }

  cancelToken = axios.CancelToken.source();

  try {
    const response = await axios.get(BASE_URL + ApiUrl, {
      cancelToken: cancelToken.token,
    });
    const result = response.data;

    if (result.stat === 'ok') {
      if (response.data) {
        UserSearchModel.setSearchResult([
          ...UserSearchModel.getSearchResult(),
          ...result?.photos?.photo,
        ]);
      }
    } else {
      SnackbarCell('Bad response!');
    }

    UserSearchModel.setIsSearching(false);
  } catch (error) {
    console.error(error);
    UserSearchModel.setIsSearching(false);
    SnackbarCell('Error while calling fetching data');
  }
};
