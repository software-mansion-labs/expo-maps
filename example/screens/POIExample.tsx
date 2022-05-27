import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ProviderContext from '../context/ProviderContext';
import SwitchContainer from '../components/SwitchContainer';
import * as Maps from 'expo-maps';

export default function POIExample() {
  const provider = useContext(ProviderContext);
  const [enablePOIs, setEnablePOIs] = useState<boolean>(true);
  const [clickablePOIs, setClickablePOIs] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={styles.map}
        provider={provider}
        enablePOIs={enablePOIs}
        clickablePOIs={clickablePOIs}
        initialCameraPosition={{
          latitude: 48.85,
          longitude: 2.34,
          zoom: 13,
          animate: true,
        }}
      />
      <View style={styles.switchView}>
        <SwitchContainer
          title="Enable POIs"
          value={enablePOIs}
          onValueChange={() => setEnablePOIs(!enablePOIs)}
        />
        <SwitchContainer
          title="Clickable POIs"
          value={clickablePOIs}
          onValueChange={() => setClickablePOIs(!clickablePOIs)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  switchView: {
    padding: 20,
  },
});
