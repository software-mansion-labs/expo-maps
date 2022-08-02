import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Snackbar } from 'react-native-paper';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';
import SwitchContainer from '../components/SwitchContainer';
import { useState } from 'react';
import { Subscription } from 'expo-modules-core';
import { useEffect } from 'react';

export default function CallbacksExample() {
  const [clickSub, setClickSub] = useState<Subscription | undefined>(undefined);
  const [dragStartSub, setDragStartSub] = useState<Subscription | undefined>(
    undefined
  );
  const [dragEndSub, setDragEndSub] = useState<Subscription | undefined>(
    undefined
  );

  const [clickEventEnabled, setClickEventEnabled] = useState(true);
  const [readyEventEnabled, setReadyEventEnabled] = useState(true);
  const [loadedEventEnabled, setLoadedEventEnabled] = useState(true);
  const [onRegionChangeEnabled, setOnRegionChangeEnabled] = useState(false);
  const [onRegionChangeStartedEnable, setOnRegionChangeStartedEnabled] =
    useState(false);
  const [onRegionChangeCmpEnabled, setOnRegChangeCmpEnabled] = useState(false);
  const [onPoiClickEnabled, setOnPoiClickEnabled] = useState(true);

  useEffect(() => {
    if (clickSub != undefined) {
      Maps.addOnMarkerClickListener(onMarkerClickListener);
    }

    if (dragStartSub != undefined) {
      Maps.addOnMarkerDragStartedListener(onMarkerDragStartedListener);
    }

    if (dragEndSub != undefined) {
      Maps.addOnMarkerDragEndedListener(onMarkerDragEndedListener);
    }
    return () => {
      Maps.removeAllListeners();
    };
  }, [clickSub, dragStartSub, dragEndSub]);

  const provider = useContext(ProviderContext);

  const [snackbarText, setSnackbarText] = useState<String | undefined>(
    undefined
  );

  const [latitude, setLatitude] = useState<number>(40.4);
  const [longitude, setLongitude] = useState<number>(-3.7);

  function onMarkerClickListener({ id }: Maps.MarkerClickEvent) {
    setSnackbarText('marker clicked, id: ' + id);
  }

  function onMarkerDragStartedListener({ id }: Maps.MarkerDragStartedEvent) {
    setSnackbarText('marker drag started, marker id: ' + id);
  }

  function onMarkerDragEndedListener({
    id,
    latitude,
    longitude,
  }: Maps.MarkerDragEndedEvent) {
    setSnackbarText(
      'marker moved, id: ' +
        id +
        ', latitude: ' +
        latitude +
        ', longitude: ' +
        longitude
    );
    if (id == '101') {
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }

  const callbacksData = [
    {
      title: 'Enable markerClick listener',
      value: clickSub != undefined,
      onValueChange: () => {
        if (clickSub == undefined) {
          setClickSub(Maps.addOnMarkerClickListener(onMarkerClickListener));
        } else {
          Maps.removeAllOnMarkerClickListeners();
          setClickSub(undefined);
        }
      },
    },
    {
      title: 'Enable markerDragStarted listener',
      value: dragStartSub != undefined,
      onValueChange: () => {
        if (dragStartSub == undefined) {
          setDragStartSub(
            Maps.addOnMarkerDragStartedListener(onMarkerDragStartedListener)
          );
        } else {
          Maps.removeAllOnMarkerDragStartedListeners();
          setDragStartSub(undefined);
        }
      },
    },
    {
      title: 'Enable markerDragEnded listener',
      value: dragEndSub != undefined,
      onValueChange: () => {
        if (dragEndSub == undefined) {
          setDragEndSub(
            Maps.addOnMarkerDragEndedListener(onMarkerDragEndedListener)
          );
        } else {
          Maps.removeAllOnMarkerDragEndedListeners();
          setDragEndSub(undefined);
        }
      },
    },
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
        onMapLoaded={() => {
          loadedEventEnabled && setSnackbarText('Map has loaded!');
        }}
        onMapReady={() => {
          readyEventEnabled && setSnackbarText('Map has initialized');
        }}
        onRegionChange={(event) => {
          onRegionChangeEnabled &&
            setSnackbarText(
              'Camera moved to:' + JSON.stringify(event.nativeEvent.target)
            );
        }}
        onRegionChangeStarted={(event) => {
          onRegionChangeStartedEnable &&
            setSnackbarText(
              'Camera started moving from:' +
                JSON.stringify(event.nativeEvent.target)
            );
        }}
        onRegionChangeComplete={(event) => {
          onRegionChangeCmpEnabled &&
            setSnackbarText(
              'Camera finished moving to:' +
                JSON.stringify(event.nativeEvent.target)
            );
        }}
        onPoiClick={(event) => {
          onPoiClickEnabled &&
            setSnackbarText('Clicked POI:' + JSON.stringify(event.nativeEvent));
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
