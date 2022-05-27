import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import * as Maps from 'expo-maps';
import SwitchContainer from '../components/SwitchContainer';
import ProviderContext from '../context/ProviderContext';
import { POICategoryType } from 'expo-maps/build/Map.types';

export default function POIExample() {
  const provider = useContext(ProviderContext);
  const ref = useRef<Maps.ExpoMap>(null);
  const [enablePOISearching, setEnablePOISearching] = useState<boolean>(false);
  const [enablePOIDisplay, setEnablePOIDisplay] = useState<boolean>(false);
  const [enablePOIFilter, setEnablePOIFilter] = useState<boolean>(false);
  const [enableQueryCompletions, setEnableQueryCompletions] =
    useState<boolean>(false);
  const [text, onChangeText] = useState<string>('');
  const [poiType, setPoiType] = useState<[] | [POICategoryType]>([]);

  return (
    <View style={styles.mapContainer}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        enablePOISearching={enablePOISearching}
        enablePOIDisplay={enablePOIDisplay}
        enablePOIFilter={poiType}
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
        <SwitchContainer
          title="Enable POI cafe filter"
          value={enablePOIFilter}
          onValueChange={() => {
            setEnablePOIFilter(!enablePOIFilter);
            if (enablePOIFilter) setPoiType([]);
            else setPoiType(['cafe']);
          }}
        />
        <SwitchContainer
          title="Fetch query completions (display in console)"
          value={enableQueryCompletions}
          onValueChange={() =>
            setEnableQueryCompletions(!enableQueryCompletions)
          }
        />
        <TextInput
          style={styles.textInput}
          editable={enableQueryCompletions}
          onChangeText={async (text) => {
            onChangeText(text);
            await ref.current?.getSearchCompletions(text);
          }}
          placeholder={'Search query'}
          value={text}
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 30,
    margin: 5,
    padding: 5,
    borderWidth: 0.5,
  },
});
