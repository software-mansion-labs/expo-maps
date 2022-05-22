import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import * as Maps from 'expo-maps';
import SwitchContainer from '../components/SwitchContainer';
import ProviderContext from '../context/ProviderContext';

export default function POIExample() {
  const provider = useContext(ProviderContext);
  const ref = useRef<Maps.ExpoMap>(null);
  const [enablePOISearching, setEnablePOISearching] = useState<boolean>(false);
  const [enablePOIDisplay, setEnablePOIDisplay] = useState<boolean>(false);

  return (
    <View style={styles.mapContainer}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        enablePOISearching={enablePOISearching}
        enablePOIDisplay={enablePOIDisplay}
        ref={ref}
      />
      <View style={styles.switchContainer}>
        <SwitchContainer
          title="Enable POI search"
          value={enablePOISearching}
          onValueChange={() => setEnablePOISearching(!enablePOISearching)}
        />
        <SwitchContainer
          title="Display POI"
          value={enablePOIDisplay}
          onValueChange={() => setEnablePOIDisplay(!enablePOIDisplay)}
        />
        <Button
          title="Test"
          onPress={async () => {
            console.log('pressed button');
            await ref.current?.test();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  switchContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
