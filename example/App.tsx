import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';

export default function App() {
  // add your api key here
  const GOOGLE_MAPS_API_KEY = '';
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        apiKey={GOOGLE_MAPS_API_KEY as string}
        style={{ flex: 1, width: '100%' }}
      />
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
