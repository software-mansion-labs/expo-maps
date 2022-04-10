import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';

export default function GeoJsonExample() {
  const provider = useContext(ProviderContext);

  return (
    <View style={styles.container}>
      <Maps.ExpoMap style={{ flex: 1, width: '100%' }} provider={provider}>
        <Maps.GeoJson
          geoJsonString={JSON.stringify(require('../assets/sample.geo.json'))}
          defaultStyle={{
            polygon: {
              fillColor: 'gray',
            },
            marker: {
              color: 'azure',
            },
          }}
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
