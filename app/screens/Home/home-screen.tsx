import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import { fetchImages } from '../../api/api-handler';
import ImageCell from '../../components/image-cell';
import SearchBar from '../../components/search-bar';
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

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View>
        <SearchBar />
        <FlatList
          contentContainerStyle={Styles.list}
          data={UserSearchModel.getSearchResult()}
          renderItem={ImageCell}
          keyExtractor={item => item.id}
          onEndReached={() => {
            UserSearchModel.setPageNumber(UserSearchModel.getPageNumber() + 1);
            fetchImages(
              UserSearchModel.getSearchValue(),
              UserSearchModel.getPageNumber().toString(),
            );
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            UserSearchModel.getIsSearching() ? (
              <ActivityIndicator size="large" />
            ) : (
              <></>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
