import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';

export default function GoogleMapsStylingExample() {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider="google"
        googleMapsJsonStyleString={JSON.stringify(
          require('../assets/exampleMapStyle.json')
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
