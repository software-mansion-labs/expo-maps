import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigators/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
