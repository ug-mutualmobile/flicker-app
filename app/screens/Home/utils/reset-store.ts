import { UserSearchModel } from '../../../models/store/user-search-model';

const ResetStore = () => {
  UserSearchModel.setSearchResult([]);
  UserSearchModel.setSearchValue('');
  UserSearchModel.setPageNumber(1);
};

export default ResetStore;
