import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';
import { StackScreenProps } from '@react-navigation/stack';

import * as Maps from 'expo-maps';

type PolygonsScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'Polygons'
>;

export default function Polygons({ route }: PolygonsScreenProps) {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={route.params.provider}
      >
        <Maps.Polygon
          points={[
            { latitude: 52, longitude: 13 },
            { latitude: 47, longitude: 11 },
            { latitude: 63, longitude: 4 },
            { latitude: 49, longitude: 22 },
          ]}
        />
        <Maps.Polygon
          points={[
            { latitude: 39, longitude: 3 },
            { latitude: 33, longitude: 2 },
            { latitude: 44, longitude: 22 },
          ]}
        />
        <Maps.Polygon
          points={[
            { latitude: 65, longitude: -5 },
            { latitude: 37, longitude: -11 },
            { latitude: 47, longitude: 5 },
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
