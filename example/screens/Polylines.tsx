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
            { latitude: 31, longitude: 127 },
            { latitude: 32, longitude: 120 },
            { latitude: 11, longitude: 110 },
            { latitude: 49, longitude: -30 },
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
