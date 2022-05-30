import { types, cast } from 'mobx-state-tree';
import { SearchResultInterface } from '../interfaces/search-result-interface';

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
      setSearchResult(result: SearchResultInterface[]) {
        self.searchResult = cast(result);
      },
      setPageNumber(number: number) {
        self.page = number;
      },
    };
  });

export const UserSearchModel = SearchModel.create({
  searchValue: '',
  isSearching: false,
  searchResult: [],
  page: 1,
});
