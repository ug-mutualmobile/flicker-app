import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './app/navigators/app-navigator';
import { navigationRef } from './app/navigators/root-navigation';
import { StoreProvider, rootStore } from './app/models/stores/root-store';

const App = () => {
  return (
    <StoreProvider value={rootStore}>
      <NavigationContainer ref={navigationRef}>
        <AppStack />
      </NavigationContainer>
    </StoreProvider>
  );
};

// const styles = StyleSheet.create({});

export default App;
