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
        ref={ref}
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        enablePOISearching={enablePOISearching}
        enablePOIDisplay={enablePOIDisplay}
      />
      <View style={styles.switchContainer}>
        <Button
          title="Test"
          onPress={async () => {
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
