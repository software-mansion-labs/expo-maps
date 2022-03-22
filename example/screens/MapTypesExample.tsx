import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';
import { MapTypes } from 'expo-maps/build/Map.types';
import DropDownPicker from 'react-native-dropdown-picker';

export default function MapTypesExample() {
  const provider = useContext(ProviderContext);

  const [mapType, setMapType] = useState<MapTypes>('normal');
  const [open, setOpen] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        mapType={mapType}
      />
      <View style={{ padding: 20 }}>
        <DropDownPicker
          items={[
            { label: 'normal', value: 'normal' },
            { label: 'satellite', value: 'satellite' },
            { label: 'hybrid', value: 'hybrid' },
            { label: 'terrain', value: 'terrain' },
          ]}
          value={mapType}
          setValue={(value) => setMapType(value as MapTypes)}
          multiple={false}
          open={open}
          setOpen={() => setOpen(!open)}
          placeholder={mapType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
