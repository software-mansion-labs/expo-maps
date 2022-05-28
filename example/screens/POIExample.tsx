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
  const [poiType, setPoiType] = useState<[] | [POICategoryType]>([]);
  const [enableQueryCompletions, setEnableQueryCompletions] =
    useState<boolean>(false);
  const [text, onChangeText] = useState<string>('');
  const [placeToSearch, setPlaceToSearch] = useState<string>('');
  const [enablePlaceSearch, setEnablePlaceSearch] = useState<boolean>(false);

  const appleMapsSearchRequest = 'Centrum Pompidou; Roue 1234';
  const googleMapsSearchRequest =
    'Centrum Pompidou; placeId:ChIJoyC4CRxu5kcRRTPcWX5srLc';

  return (
    <View style={styles.mapContainer}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        enablePOISearching={enablePOISearching}
        enablePOIDisplay={enablePOIDisplay}
        enablePOIFilter={poiType}
        createPOISearchRequest={placeToSearch}
        ref={ref}
        initialCameraPosition={{
          latitude: 48.85,
          longitude: 2.34,
          zoom: 13,
          animate: true,
        }}
      />
      <View style={styles.switchContainer}>
        {provider == 'apple' && (
          <SwitchContainer
            title="Enable POI search"
            value={enablePOISearching}
            onValueChange={() => setEnablePOISearching(!enablePOISearching)}
          />
        )}
        <SwitchContainer
          title="Display POI"
          value={enablePOIDisplay}
          onValueChange={() => setEnablePOIDisplay(!enablePOIDisplay)}
        />
        {provider == 'apple' && (
          <SwitchContainer
            title="Enable POI cafe filter"
            value={enablePOIFilter}
            onValueChange={() => {
              setEnablePOIFilter(!enablePOIFilter);
              if (enablePOIFilter) setPoiType([]);
              else setPoiType(['cafe']);
            }}
          />
        )}
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
        <SwitchContainer
          title="Search Centrum Pompidou"
          value={enablePlaceSearch}
          onValueChange={() => {
            setEnablePlaceSearch(!enablePlaceSearch);
            if (!enablePlaceSearch) {
              if (provider == 'apple') {
                setPlaceToSearch(appleMapsSearchRequest);
              } else {
                setPlaceToSearch(googleMapsSearchRequest);
              }
            } else {
              setPlaceToSearch('');
            }
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
