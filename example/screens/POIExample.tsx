import React, { useContext, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';

import * as Maps from 'expo-maps';
import SwitchContainer from '../components/SwitchContainer';
import ProviderContext from '../context/ProviderContext';
import type { SearchCompletion } from '../../expo-maps/src/Common.types';
export default function POIExample() {
  const provider = useContext(ProviderContext);
  const ref = useRef<Maps.ExpoMap>(null);
  const [enablePOISearching, setEnablePOISearching] = useState<boolean>(false);
  const [enablePOIs, setEnablePOIs] = useState<boolean>(false);
  const [enablePOIFilter, setEnablePOIFilter] = useState<boolean>(false);
  const [poiType, setPoiType] = useState<[] | [Maps.POICategoryType]>([]);
  const [enableQueryCompletions, setEnableQueryCompletions] =
    useState<boolean>(false);
  const [text, onChangeText] = useState<string>('');
  const [placeToSearch, setPlaceToSearch] = useState<string>('');
  const [enablePlaceSearch, setEnablePlaceSearch] = useState<boolean>(false);
  const [clickablePOIs, setClickablePOIs] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<[SearchCompletion]>([]);
  const appleMapsSearchRequest = 'Centrum Pompidou;Roue 1234';
  const googleMapsSearchRequest =
    'Centrum Pompidou;ChIJoyC4CRxu5kcRRTPcWX5srLc';

  return (
    <View style={styles.mapContainer}>
      <View style={styles.searchContainer}>
        <SearchBar
          onValueChange={(value) => {
            ref.current?.getSearchCompletions(value).then((results) => {
              setSearchResults(results);
            });
            console.log(value);
            if (value.length < 1) {
              setSearchResults([]);
            }
          }}
        />
      </View>
      {searchResults.length > 0 && (
        <View
          style={{
            flexGrow: 1,
            backgroundColor: 'white',
          }}
        >
          <FlatList
            data={searchResults}
            renderItem={({ item }) => {
              console.log(item);
              return (
                <View style={{ paddingVertical: 10, paddingHorizontal: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    {item.subtitle}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}

      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        enablePOISearching={enablePOISearching}
        enablePOIs={enablePOIs}
        enablePOIFilter={poiType}
        createPOISearchRequest={placeToSearch}
        clickablePOIs={clickablePOIs}
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
          title="Enable POIs"
          value={enablePOIs}
          onValueChange={() => setEnablePOIs(!enablePOIs)}
        />
        {provider == 'google' && (
          <SwitchContainer
            title="Clickable POIs"
            value={clickablePOIs}
            onValueChange={() => setClickablePOIs(!clickablePOIs)}
          />
        )}
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

function SearchBar({
  onValueChange,
}: {
  onValueChange: (text: string) => void;
}) {
  const [text, setText] = useState<string>('');
  return (
    <>
      <TextInput
        style={styles.searchBar}
        placeholder={'🔎 Search for POIs'}
        value={text}
        onChangeText={(text) => {
          setText(text);
          onValueChange(text);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  switchContainer: {
    padding: 20,
  },
  searchBar: {
    ms: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 17,
    lineHeight: 18.5,
    borderRadius: 8,
    backgroundColor: 'rgb(239,239,239)',
    color: 'rgb(96,96,96)',
  },
  searchContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textInput: {
    margin: 5,
    padding: 5,
    borderWidth: 0.5,
  },
});
