import { cast, flow, types } from 'mobx-state-tree';
import SnackbarCell from '../../components/snackbar';
import * as ImageApi from '../../services/user';
import { FetchImageInterface } from '../interfaces/fetch-image-interface';
import { ImageDetailInterface } from '../interfaces/image-detail-interface';
import { rootStore } from './root-store';

const SearchResultModel = types.model({
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

export const UserStore = types
  .model('UserStore')
  .props({
    searchValue: types.string,
    isSearching: types.boolean,
    page: types.number,
    searchResult: types.array(SearchResultModel),
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
      fetchImageAction: flow(function* (data: FetchImageInterface) {
        self.searchValue = data.searchValue;
        self.isSearching = true;
        try {
          const response = yield ImageApi.fetchImagesApi(
            data.searchValue,
            data.page.toString(),
          );
          console.log(
            '🚀 ~ file: user-store.ts ~ line 66 ~ fetchImageAction:flow ~ response',
            response,
          );
          const result = response.data;
          if (result.stat === 'ok') {
            if (response.data) {
              rootStore.userStore.setSearchResult([
                ...rootStore.userStore.getSearchResult(),
                ...result?.photos?.photo,
              ]);
            }
          } else {
            SnackbarCell('Bad response!');
          }
          self.isSearching = false;
        } catch (error) {
          console.error(error);
          self.isSearching = false;
          SnackbarCell('Error while calling fetching data');
        }
      }),
    };
  });

export const UserStoreInitialState = {
  searchValue: '',
  isSearching: false,
  searchResult: [],
  page: 1,
};
