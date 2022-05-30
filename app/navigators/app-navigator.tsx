import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/home-screen';
import ImageDetail from '../screens/Image/image-detail';
import { observer } from 'mobx-react-lite';

export type NavigatorParamList = {
  HomeScreen: undefined;
  ImageDetail: undefined;
};

const Stack = createStackNavigator<NavigatorParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={observer(HomeScreen)} />
      <Stack.Screen name="ImageDetail" component={observer(ImageDetail)} />
    </Stack.Navigator>
  );
}
