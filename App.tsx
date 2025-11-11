import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import AddItem from './src/screens/AddItem';
import GuestFilter from './src/screens/GuestFilter';
import Changelog from './src/screens/Changelog';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  GuestFilter: undefined;
  Changelog: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddItem" component={AddItem} options={{ title: 'Add / Remove Items' }} />
        <Stack.Screen name="GuestFilter" component={GuestFilter} options={{ title: 'Filter by Course' }} />
        <Stack.Screen name="Changelog" component={Changelog} options={{ title: 'Changelog' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
