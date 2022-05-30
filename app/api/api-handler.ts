import { API_KEY, BASE_URL } from '../assets/contants';
import { UserSearchModel } from '../models/store/search-model';

export const fetchImages = async (searchValue: string, page: string) => {
  const ApiUrl = `?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchValue}&text=${searchValue}&format=json&nojsoncallback=1&per_page=10&page=${page}`;
  UserSearchModel.setSearchValue(searchValue);
  UserSearchModel.setIsSearching(true);

  try {
    const response = await fetch(BASE_URL + ApiUrl);
    const result = await response.json();

    UserSearchModel.setSearchResult([
      ...UserSearchModel.getSearchResult(),
      ...result?.photos?.photo,
    ]);
    UserSearchModel.setIsSearching(false);
  } catch (error) {
    console.error(error);
    UserSearchModel.setIsSearching(false);
  }
};
