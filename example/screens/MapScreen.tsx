import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import exampleMapStyle from '../assets/exampleMapStyle.json';

import * as Maps from 'expo-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider="apple"
        googleMapsJsonStyleString={JSON.stringify(exampleMapStyle)}
      >
        <Maps.Marker latitude={-33.86} longitude={151.2} />
        <Maps.Marker latitude={-32} longitude={152} />
        <Maps.Polygon
          points={[
            {
              latitude: -30,
              longitude: 150,
            },
            {
              latitude: -29,
              longitude: 152,
            },
            {
              latitude: -31,
              longitude: 150,
            },
          ]}
        />
        <Maps.Polyline
          points={[
            {
              latitude: -29,
              longitude: 150,
            },
            {
              latitude: -29,
              longitude: 151,
            },
            {
              latitude: -28,
              longitude: 152,
            },
          ]}
        />
      </Maps.ExpoMap>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
