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
    page: types.number,
    searchResult: types.array(SearchResultModel),
    isAppLoading: types.boolean,
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
      getIsAppLoading() {
        return self.isAppLoading;
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
      setIsAppLoading(isLoading: boolean) {
        self.isAppLoading = isLoading;
      },
      fetchImageAction: flow(function* (data: FetchImageInterface) {
        self.searchValue = data.searchValue;
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
        } catch (error) {
          self.isSearching = false;
        }
      }),
    };
  });

export const UserStoreInitialState = {
  searchValue: '',
  isSearching: false,
  searchResult: [],
  page: 1,
  isAppLoading: true,
};
