import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { FetchImageApiModel } from '../models/store/fetch-image-model';
import { UserSearchModel } from '../models/store/search-model';
import STYLES from '../screens/Home/home-screen.style';

interface SearchBarProps {
  PlaceHolder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ PlaceHolder }) => {
  const [localSearchValue, onChangeLocalSearchValue] = useState<string>('');

  return (
    <TextInput
      style={STYLES.input}
      placeholder={PlaceHolder}
      placeholderTextColor={'black'}
      onChangeText={text => {
        UserSearchModel.setSearchResult([]);
        UserSearchModel.setPageNumber(1);
        onChangeLocalSearchValue(text);

        if (text) {
          FetchImageApiModel.fetchImageAction({
            searchValue: text,
            page: '1',
          });
        } else {
          console.log('hello');
          UserSearchModel.setSearchResult([]);
        }
      }}
      value={localSearchValue}
    />
  );
};

export default SearchBar;
