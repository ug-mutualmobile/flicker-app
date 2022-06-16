import { cast, flow, types } from 'mobx-state-tree';
import SnackbarCell from '../../components/snack-bar/snack-bar';
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
    isPageRefreshing: false,
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
      getIsPageRefreshing() {
        return self.isPageRefreshing;
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
      setIsPageRefreshing(isPageRefreshing: boolean) {
        self.isPageRefreshing = isPageRefreshing;
      },
      fetchImageAction: flow(function* (data: FetchImageInterface) {
        self.searchValue = data.searchValue;
        self.isPageRefreshing = data.isPageRefreshing;
        self.isSearching = true;
        try {
          const response = yield ImageApi.fetchImagesApi(
            data.searchValue,
            data.page.toString(),
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
          self.isPageRefreshing = false;
        } catch (error) {
          console.log(
            '🚀 ~ file: user-store.ts ~ line 89 ~ fetchImageAction:flow ~ error',
            error,
          );
          self.isSearching = false;
          self.isPageRefreshing = false;
        }
      }),
    };
  });

export const UserStoreInitialState = {
  searchValue: '',
  isSearching: false,
  searchResult: [],
  page: 1,
  isPageRefreshing: false,
};
