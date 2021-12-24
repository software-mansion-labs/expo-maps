import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap style={{ flex: 1, width: '100%' }} provider="apple" />
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
