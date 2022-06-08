import React, { useState } from 'react';
import { TextInput } from 'react-native';
import STYLES from '../screens/home-screen/home-screen.style';
import { COLORS } from '../theme/colors';

interface SearchBarProps {
  placeHolder: string;
  onChangeText: (
    text: string,
    onChangeLocalSearchValue: (text: string) => void,
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeHolder, onChangeText }) => {
  const [localSearchValue, onChangeLocalSearchValue] = useState<string>('');

  return (
    <TextInput
      style={STYLES.input}
      placeholder={placeHolder}
      placeholderTextColor={COLORS.black}
      onChangeText={text => onChangeText(text, onChangeLocalSearchValue)}
      value={localSearchValue}
    />
  );
};

export default SearchBar;
