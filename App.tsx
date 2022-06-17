import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './app/navigators/app-navigator';
import { navigationRef } from './app/navigators/root-navigation';
import { StoreProvider, rootStore } from './app/models/stores/root-store';
// import { NativeModules } from 'react-native';

const App = () => {
  // const env = NativeModules.RNConfig.env;
  // console.log('🚀🚀🚀🚀🚀 ~ file: App.tsx ~ line 10 ~ App ~ env', env);
  return (
    <StoreProvider value={rootStore}>
      <NavigationContainer ref={navigationRef}>
        <AppStack />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
