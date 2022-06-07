import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import { debounce } from 'lodash';
import ImageCell from '../../components/image-cell';
import SearchBar from '../../components/search-bar';
import { UserSearchModel } from '../../models/store/user-search-model';
import ResetStore from './utils/reset-store';
import Styles from './home-screen.style';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  useEffect(() => {
    return () => {
      ResetStore();
    };
  }, []);

  const onPageFinish = debounce(() => {
    UserSearchModel.setPageNumber(UserSearchModel.getPageNumber() + 1);
    UserSearchModel.fetchImageAction({
      searchValue: UserSearchModel.getSearchValue(),
      page: UserSearchModel.getPageNumber().toString(),
    });
  }, 1000);

  const onSearch = debounce((text: string) => {
    UserSearchModel.fetchImageAction({
      searchValue: text,
      page: '1',
    });
  }, 1000);

  const onChangeText = (
    text: string,
    onChangeLocalSearchValue: (text: string) => void,
  ) => {
    UserSearchModel.setSearchResult([]);
    UserSearchModel.setPageNumber(1);
    onChangeLocalSearchValue(text);

    if (text) {
      onSearch(text);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View>
        <SearchBar PlaceHolder="Search image" OnChangeText={onChangeText} />
        <FlatList
          contentContainerStyle={Styles.list}
          data={UserSearchModel.getSearchResult()}
          renderItem={ImageCell}
          onEndReached={() => {
            onPageFinish();
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            <ActivityIndicator
              animating={UserSearchModel.getIsSearching()}
              size="large"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
