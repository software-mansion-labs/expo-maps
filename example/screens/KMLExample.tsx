import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';

export default function KMLExample() {
  const provider = useContext(ProviderContext);

  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        initialCameraPosition={{
          target: {
            latitude: 38.818844,
            longitude: 8.366278,
          },
          zoom: 2,
        }}
      >
        <Maps.KML filePath={require('../assets/sample.kml')} />
      </Maps.ExpoMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
