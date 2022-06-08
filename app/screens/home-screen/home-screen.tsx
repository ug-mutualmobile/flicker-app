import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import { debounce } from 'lodash';
import { useStore } from '../../models/stores/root-store';
import ImageCell from '../../components/image-cell';
import SearchBar from '../../components/search-bar';
import ResetStore from './utils/reset-store';
import Styles from './home-screen.style';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { userStore } = useStore();

  useEffect(() => {
    return () => {
      ResetStore();
    };
  }, []);

  const onPageFinish = debounce(() => {
    userStore.setPageNumber(userStore.getPageNumber() + 1);
    userStore.fetchImageAction({
      searchValue: userStore.getSearchValue(),
      page: userStore.getPageNumber().toString(),
    });
  }, 1000);

  const onSearch = debounce((text: string) => {
    userStore.fetchImageAction({
      searchValue: text,
      page: '1',
    });
  }, 1000);

  const onChangeText = (
    text: string,
    onChangeLocalSearchValue: (text: string) => void,
  ) => {
    userStore.setSearchResult([]);
    userStore.setPageNumber(1);
    onChangeLocalSearchValue(text);

    if (text) {
      onSearch(text);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View>
        <SearchBar placeHolder="Search image" onChangeText={onChangeText} />
        <FlatList
          contentContainerStyle={Styles.list}
          data={userStore.getSearchResult()}
          renderItem={ImageCell}
          keyExtractor={item => item.id}
          onEndReached={() => {
            onPageFinish();
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            <ActivityIndicator
              animating={userStore.getIsSearching()}
              size="large"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
