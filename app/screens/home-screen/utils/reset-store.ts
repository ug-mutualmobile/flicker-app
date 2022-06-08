import { rootStore } from '../../../models/stores/root-store';

const ResetStore = () => {
  rootStore.userStore.setSearchResult([]);
  rootStore.userStore.setSearchValue('');
  rootStore.userStore.setPageNumber(1);
};

export default ResetStore;
