import { types, cast } from 'mobx-state-tree';
import * as ImageApi from '../../services/user';
import SnackbarCell from '../../components/snackbar';
import { ImageDetailInterface } from '../interfaces/image-detail-interface';
import { FetchImageInterface } from '../interfaces/fetch-image-interface';

const SearchResultArray = types.model({
  farm: types.number,
  id: types.string,
  isfamily: types.number,
  isfriend: types.number,
  ispublic: types.number,
  owner: types.string,
  secret: types.string,
  server: types.string,
  title: types.string,
});

const SearchModel = types
  .model({
    searchValue: types.string,
    isSearching: types.boolean,
    page: types.number,
    searchResult: types.array(SearchResultArray),
  })
  .views(self => {
    return {
      getSearchValue() {
        return self.searchValue;
      },
      getIsSearching() {
        return self.isSearching;
      },
      getSearchResult() {
        return self.searchResult;
      },
      getPageNumber() {
        return self.page;
      },
    };
  })
  .actions(self => {
    return {
      setIsSearching(isSearching: boolean) {
        self.isSearching = isSearching;
      },
      setSearchValue(searchValue: string) {
        self.searchValue = searchValue;
      },
      setSearchResult(result: ImageDetailInterface[]) {
        self.searchResult = cast(result);
      },
      setPageNumber(number: number) {
        self.page = number;
      },
      async fetchImageAction(data: FetchImageInterface) {
        UserSearchModel.setSearchValue(data.searchValue);
        UserSearchModel.setIsSearching(true);

        try {
          const response = await ImageApi.fetchImagesApi(
            data.searchValue,
            data.page.toString(),
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

export const UserSearchModel = SearchModel.create({
  searchValue: '',
  isSearching: false,
  searchResult: [],
  page: 1,
});
