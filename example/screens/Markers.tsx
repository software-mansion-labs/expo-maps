import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';

import * as Maps from 'expo-maps';

type MarkersScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'Markers'
>;

export default function Markers({ route }: MarkersScreenProps) {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={route.params.provider}
      >
        <Maps.Marker
          latitude={48.85}
          longitude={2.35}
          title="Paris"
          snippet="You can choose custom marker colors!"
          defaultMarkerColor="azure"
        />
        <Maps.Marker
          latitude={44}
          longitude={3}
          title="Building"
          snippet="You can use custom marker icons!"
          icon={require('../assets/building.png')}
        />
        <Maps.Marker
          latitude={51.5}
          longitude={-0.13}
          title="London"
          snippet="I'm semi transparent!"
          opacity={0.5}
        />
        <Maps.Marker
          latitude={40.4}
          longitude={-3.7}
          title="Madrid"
          snippet="I'm dragable"
          draggable={true}
          defaultMarkerColor="green"
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
