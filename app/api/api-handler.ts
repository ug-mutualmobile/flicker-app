import SnackbarCell from '../components/snackbar';
import { UserSearchModel } from '../models/store/search-model';
import * as ImageApi from '../services/user';

export const fetchImages = async (searchValue: string, page: string) => {
  UserSearchModel.setSearchValue(searchValue);
  UserSearchModel.setIsSearching(true);

  try {
    const response = await ImageApi.fetchImagesApi(searchValue, page);
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
