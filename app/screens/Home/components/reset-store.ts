import { UserSearchModel } from '../../../models/store/search-model';

const ResetStore = () => {
  UserSearchModel.setSearchResult([]);
  UserSearchModel.setSearchValue('');
  UserSearchModel.setPageNumber(1);
};

export default ResetStore;
