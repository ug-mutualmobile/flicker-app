import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import ImageCell from '../../components/image-cell';
import SearchBar from '../../components/search-bar';
import { FetchImageApiModel } from '../../models/store/fetch-image-model';
import { UserSearchModel } from '../../models/store/search-model';
import ResetStore from './components/reset-store';
import Styles from './home-screen.style';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  useEffect(() => {
    return () => {
      ResetStore();
    };
  }, []);

  const onPageFinish = () => {
    UserSearchModel.setPageNumber(UserSearchModel.getPageNumber() + 1);
    FetchImageApiModel.fetchImageAction({
      searchValue: UserSearchModel.getSearchValue(),
      page: UserSearchModel.getPageNumber().toString(),
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View>
        <SearchBar PlaceHolder="Search image" />
        <FlatList
          contentContainerStyle={Styles.list}
          data={UserSearchModel.getSearchResult()}
          renderItem={ImageCell}
          keyExtractor={item => item.id}
          onEndReached={() => {
            onPageFinish();
          }}
          onEndReachedThreshold={0.4}
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
