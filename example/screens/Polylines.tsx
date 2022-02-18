import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';
import { StackScreenProps } from '@react-navigation/stack';

import * as Maps from 'expo-maps';

type PolylinesScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'Polylines'
>;

export default function Polygons({ route }: PolylinesScreenProps) {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={route.params.provider}
      >
        <Maps.Polyline
          points={[
            { latitude: 51.5, longitude: -0.13 },
            { latitude: 48.86, longitude: 2.34 },
            { latitude: 50.9, longitude: 4.375 },
            { latitude: 48.16, longitude: 11.5 },
            { latitude: 52.5, longitude: 13.5 },
          ]}
        />
      </Maps.ExpoMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
