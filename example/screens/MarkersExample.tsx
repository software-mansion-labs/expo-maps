import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';

export default function MarkerExample() {
  const provider = useContext(ProviderContext);
  return (
    <View style={styles.container}>
      <Maps.ExpoMap style={{ flex: 1, width: '100%' }} provider={provider}>
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
