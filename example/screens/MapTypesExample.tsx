import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';
import { MapTypes } from 'expo-maps/build/Map.types';
import DropDownPicker from 'react-native-dropdown-picker';
import SettingsContainer from '../components/SettingsContainer';

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
      <SettingsContainer>
        <DropDownPicker
          items={[
            { label: 'normal', value: 'value' },
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
          style={{
            backgroundColor: '#808080',
            borderColor: 'white',
            shadowColor: 'white',
          }}
          textStyle={{
            color: 'white',
          }}
          listItemContainerStyle={{
            backgroundColor: '#808080',
          }}
        />
      </SettingsContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
