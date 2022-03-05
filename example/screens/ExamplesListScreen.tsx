import React, { useState } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import ExamplesListItem from '../components/ExamplesListItem';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';
import { CONCRETE_EXAMPLE_SCREENS } from '../constants/ConcreteExampleScreens';
import { Providers } from 'expo-maps/build/Maps.types';

type ExamplesListScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'ExamplesListScreen'
>;

export default function ExamplesListScreen({
  navigation,
  route,
}: ExamplesListScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {CONCRETE_EXAMPLE_SCREENS.map(({ name }) => (
          <ExamplesListItem
            key={name}
            name={name}
            onExampleSelect={() => {
              navigation.navigate(name);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}
