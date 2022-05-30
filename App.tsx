import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './app/navigators/app-navigator';
import { navigationRef } from './app/navigators/root-navigation';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({});

export default App;
