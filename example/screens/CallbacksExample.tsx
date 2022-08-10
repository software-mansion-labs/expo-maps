import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Snackbar } from 'react-native-paper';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';
import SwitchContainer from '../components/SwitchContainer';
import { useState } from 'react';

export default function CallbacksExample() {
  const [clickEventEnabled, setClickEventEnabled] = useState(true);
  const [readyEventEnabled, setReadyEventEnabled] = useState(true);
  const [loadedEventEnabled, setLoadedEventEnabled] = useState(true);
  const [onRegionChangeEnabled, setOnRegionChangeEnabled] = useState(false);
  const [onRegionChangeStartedEnable, setOnRegionChangeStartedEnabled] =
    useState(false);
  const [onRegionChangeCmpEnabled, setOnRegChangeCmpEnabled] = useState(false);
  const [onPoiClickEnabled, setOnPoiClickEnabled] = useState(true);
  const [onMarkerPressEnabled, setOnMarkerPressEnabled] = useState(true);
  const [onMarkerDragEnabled, setOnMarkerDragEnabled] = useState(false);
  const [onMarkerDragStartedEnabled, setOnMarkerDragStartedEnabled] =
    useState(true);
  const [onMarkerDragCompleteEnabled, setOnMarkerDragCompleteEnabled] =
    useState(true);

  const provider = useContext(ProviderContext);

  const [snackbarText, setSnackbarText] = useState<String | undefined>(
    undefined
  );

  const [latitude, setLatitude] = useState<number>(40.4);
  const [longitude, setLongitude] = useState<number>(-3.7);

  const callbacksData = [
    {
      title: 'Enable onMapReady event',
      value: readyEventEnabled,
      onValueChange: () => {
        setReadyEventEnabled(!readyEventEnabled);
      },
    },
    {
      title: 'Enable onMapLoaded event',
      value: loadedEventEnabled,
      onValueChange: () => {
        setLoadedEventEnabled(!loadedEventEnabled);
      },
    },
    {
      title: 'Enable onMapClick event',
      value: clickEventEnabled,
      onValueChange: () => {
        setClickEventEnabled(!clickEventEnabled);
      },
    },
    {
      title: 'Enable onRegionChange event',
      value: onRegionChangeEnabled,
      onValueChange: () => {
        setOnRegionChangeEnabled(!onRegionChangeEnabled);
      },
    },
    {
      title: 'Enable onRegionChangeStarted event',
      value: onRegionChangeStartedEnable,
      onValueChange: () => {
        setOnRegionChangeStartedEnabled(!onRegionChangeStartedEnable);
      },
    },
    {
      title: 'Enable onRegionChangeComplete event',
      value: onRegionChangeCmpEnabled,
      onValueChange: () => {
        setOnRegChangeCmpEnabled(!onRegionChangeCmpEnabled);
      },
    },
    {
      title: 'Enable onPoiClick event',
      value: onPoiClickEnabled,
      onValueChange: () => {
        setOnPoiClickEnabled(!onPoiClickEnabled);
      },
    },
    {
      title: 'Enable onMarkerPress event',
      value: onMarkerPressEnabled,
      onValueChange: () => {
        setOnMarkerPressEnabled(!onMarkerPressEnabled);
      },
    },
    {
      title: 'Enable onMarkerDrag event',
      value: onMarkerDragEnabled,
      onValueChange: () => {
        setOnMarkerDragEnabled(!onMarkerDragEnabled);
      },
    },
    {
      title: 'Enable onMarkerDragStarted event',
      value: onMarkerDragStartedEnabled,
      onValueChange: () => {
        setOnMarkerDragStartedEnabled(!onMarkerDragStartedEnabled);
      },
    },
    {
      title: 'Enable onMarkerDragComplete event',
      value: onMarkerDragCompleteEnabled,
      onValueChange: () => {
        setOnMarkerDragCompleteEnabled(!onMarkerDragCompleteEnabled);
      },
    },
  ];
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        onMapClick={(event) => {
          clickEventEnabled &&
            setSnackbarText(
              'Map clicked at:' + JSON.stringify(event.nativeEvent)
            );
        }}
        onDoublePress={(event) => {
          setSnackbarText(
            'Double press at:' + JSON.stringify(event.nativeEvent)
          );
        }}
        onLongPress={(event) => {
          setSnackbarText('Long press at:' + JSON.stringify(event.nativeEvent));
        }}
        onMapLoaded={() => {
          loadedEventEnabled && setSnackbarText('Map has loaded!');
        }}
        onClusterPress={(event) => {
          console.log(event.nativeEvent);
        }}
        onRegionChange={(event) => {
          onRegionChangeEnabled &&
            setSnackbarText(
              'Camera moved to:' + JSON.stringify(event.nativeEvent)
            );
        }}
        onRegionChangeStarted={(event) => {
          onRegionChangeStartedEnable &&
            setSnackbarText(
              'Camera started moving from:' + JSON.stringify(event.nativeEvent)
            );
        }}
        onRegionChangeComplete={(event) => {
          onRegionChangeCmpEnabled &&
            setSnackbarText(
              'Camera finished moving to:' + JSON.stringify(event.nativeEvent)
            );
        }}
        onPoiClick={(event) => {
          onPoiClickEnabled &&
            setSnackbarText('Clicked POI:' + JSON.stringify(event.nativeEvent));
        }}
        onMarkerPress={(event) => {
          onMarkerPressEnabled &&
            setSnackbarText(
              'Clicked marker at: ' +
                event.nativeEvent.longitude +
                ' ' +
                event.nativeEvent.longitude
            );
        }}
        onMarkerDrag={(event) => {
          onMarkerDragEnabled &&
            setSnackbarText(
              'Dragging marker: ' + JSON.stringify(event.nativeEvent)
            );
        }}
        onMarkerDragStarted={(event) => {
          onMarkerDragStartedEnabled &&
            setSnackbarText(
              'Marker drag started: ' + JSON.stringify(event.nativeEvent)
            );
        }}
        onMarkerDragComplete={(event) => {
          onMarkerDragCompleteEnabled &&
            setSnackbarText(
              'Marker drag complete: ' + JSON.stringify(event.nativeEvent)
            );
        }}
      >
        <Maps.Marker
          id="100"
          latitude={48.85}
          longitude={2.35}
          markerTitle="Paris"
          markerSnippet="Marker with an id: 100"
          color="blue"
        />
        <Maps.Marker
          id="101"
          latitude={latitude}
          longitude={longitude}
          markerTitle="Madrid"
          markerSnippet="Draggable marker with an id: 101"
          draggable={true}
          color="green"
        />
        <Maps.Cluster
          id="10"
          name="sample_cluster_group"
          minimumClusterSize={2}
          color="purple"
          opacity={0.5}
          markerTitle="Cluster"
          markerSnippet="Cluster with an id: 10"
        >
          <Maps.Marker
            id="1"
            color="blue"
            draggable={true}
            latitude={50}
            longitude={10}
            markerTitle="Marker"
            markerSnippet="Marker with an id: 1"
          />
          <Maps.Marker latitude={51} longitude={10} />
          <Maps.Marker latitude={52} longitude={10.15} />
          <Maps.Marker latitude={52} longitude={9.85} />
        </Maps.Cluster>
      </Maps.ExpoMap>
      <Snackbar
        visible={snackbarText != undefined}
        onDismiss={() => setSnackbarText(undefined)}
        style={{ backgroundColor: 'white' }}
        wrapperStyle={styles.snackbar}
      >
        <Text style={{ color: 'black' }}>{snackbarText}</Text>
      </Snackbar>
      <View style={{ maxHeight: 200 }}>
        <FlatList
          contentContainerStyle={styles.eventsList}
          data={callbacksData}
          renderItem={({ item }) => <SwitchContainer {...item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbar: {
    top: 0,
  },
  eventsList: {
    padding: 20,
  },
});
