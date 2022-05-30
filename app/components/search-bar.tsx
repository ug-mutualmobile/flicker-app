import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { fetchImages } from '../api/api-handler';
import STYLES from '../screens/Home/home-screen.style';

const SearchBar = () => {
  const [localSearchValue, onChangeLocalSearchValue] = useState<string>('');

  return (
    <TextInput
      style={STYLES.input}
      placeholder="Search image"
      onSubmitEditing={() => fetchImages(localSearchValue, '1')}
      placeholderTextColor={'black'}
      onChangeText={onChangeLocalSearchValue}
      value={localSearchValue}
    />
  );
};

export default SearchBar;
