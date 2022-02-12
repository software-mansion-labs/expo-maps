import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExamplesListScreen from '../screens/ExamplesListScreen';
import { CONCRETE_EXAMPLE_SCREENS } from '../constants/ConcreteExampleScreens';

// TODO: definetly type this better!
export interface Provider {
  provider: 'apple' | 'google';
}

export type ExamplesStackNavigatorProps = {
  ExamplesListScreen: undefined;
  Markers: Provider;
  Polygons: Provider;
  Polylines: Provider;
};

const ExamplesStackNavigator =
  createStackNavigator<ExamplesStackNavigatorProps>();

export default function MainNavigator() {
  return (
    <ExamplesStackNavigator.Navigator>
      <ExamplesStackNavigator.Screen
        name="ExamplesListScreen"
        component={ExamplesListScreen}
        options={{ title: 'ExpoMaps 🗺️' }}
      />
      {CONCRETE_EXAMPLE_SCREENS.map(({ name, screen }) => (
        <ExamplesStackNavigator.Screen
          name={name}
          component={screen}
          key={name}
        />
      ))}
    </ExamplesStackNavigator.Navigator>
  );
}
