import { types } from 'mobx-state-tree';
import * as ImageApi from '../../services/user';
import SnackbarCell from '../../components/snackbar';
import { UserSearchModel } from './search-model';

const FetchImageModel = types
  .model({
    searchValue: types.string,
    page: types.string,
  })
  .actions(self => {
    return {
      async fetchImageAction(data: typeof self) {
        UserSearchModel.setSearchValue(data.searchValue);
        UserSearchModel.setIsSearching(true);

        try {
          const response = await ImageApi.fetchImagesApi(
            data.searchValue,
            data.page,
          );
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
      },
    };
  });

export const FetchImageApiModel = FetchImageModel.create({
  searchValue: '',
  page: '',
});
