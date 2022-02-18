import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import ProviderContext from '../context/ProviderContext';

import * as Maps from 'expo-maps';

export default function Polygons() {
  const provider = useContext(ProviderContext);
  return (
    <View style={styles.container}>
      <Maps.ExpoMap style={{ flex: 1, width: '100%' }} provider={provider}>
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
