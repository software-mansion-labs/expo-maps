import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExamplesListScreen from '../screens/ExamplesListScreen';
import { CONCRETE_EXAMPLE_SCREENS } from '../constants/ConcreteExampleScreens';
import { Providers } from 'expo-maps/build/Maps.types';

// TODO: definetly type this better!
interface ProviderProp {
  provider: Providers;
}

export type ExamplesStackNavigatorProps = {
  ExamplesListScreen: undefined;
  Markers: ProviderProp;
  Polygons: ProviderProp;
  Polylines: ProviderProp;
  Controls: ProviderProp;
  'Google Maps Styling': ProviderProp;
  Gestures: ProviderProp;
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