import React, { useState } from 'react';
import { TextInput } from 'react-native';
import STYLES from '../screens/Home/home-screen.style';

interface SearchBarProps {
  PlaceHolder: string;
  OnChangeText: (
    text: string,
    onChangeLocalSearchValue: (text: string) => void,
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ PlaceHolder, OnChangeText }) => {
  const [localSearchValue, onChangeLocalSearchValue] = useState<string>('');

  return (
    <TextInput
      style={STYLES.input}
      placeholder={PlaceHolder}
      placeholderTextColor={'black'}
      onChangeText={text => OnChangeText(text, onChangeLocalSearchValue)}
      value={localSearchValue}
    />
  );
};

export default SearchBar;
