import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';
import SwitchContainer from '../components/SwitchContainer';
import { useState } from 'react';
import { Subscription } from 'expo-modules-core';

export default function CallbacksExample() {
  const provider = useContext(ProviderContext);

  const [snackbarText, setSnackbarText] = useState<String | undefined>(
    undefined
  );

  const [latitude, setLatitude] = useState<number>(40.4);
  const [longitude, setLongitude] = useState<number>(-3.7);

  const [clickSub, setClickSub] = useState<Subscription | undefined>(undefined);
  const [dragEndSub, setDragEndSub] = useState<Subscription | undefined>(
    undefined
  );
  const [dragStartSub, setDragStartSub] = useState<Subscription | undefined>(
    undefined
  );
  const [cameraMoveStartSub, setCameraMoveStartSub] = useState<
    Subscription | undefined
  >(undefined);
  const [cameraMoveEndSub, setCameraMoveEndSub] = useState<
    Subscription | undefined
  >(undefined);

  return (
    <View style={styles.container}>
      <Maps.ExpoMap style={{ flex: 1, width: '100%' }} provider={provider}>
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
        <View>
          <Text>{snackbarText}</Text>
        </View>
      </Snackbar>
      <SwitchContainer
        title="Enable markerClick listener"
        value={clickSub != undefined}
        onValueChange={() => {
          if (clickSub == undefined) {
            setClickSub(
              Maps.addOnMarkerClickListener(({ id }: Maps.MarkerClickEvent) => {
                setSnackbarText('marker clicked, id: ' + id);
              })
            );
          } else {
            Maps.removeAllOnMarkerClickListeners();
            setClickSub(undefined);
          }
        }}
      />
      <SwitchContainer
        title="Enable markerDragStarted listener"
        value={dragStartSub != undefined}
        onValueChange={() => {
          if (dragStartSub == undefined) {
            setDragStartSub(
              Maps.addOnMarkerDragStartedListener(
                ({ id }: Maps.MarkerDragStartedEvent) => {
                  setSnackbarText('marker drag started, marker id: ' + id);
                }
              )
            );
          } else {
            Maps.removeAllOnMarkerDragStartedListeners();
            setDragStartSub(undefined);
          }
        }}
      />
      <SwitchContainer
        title="Enable markerDragEnded listener"
        value={dragEndSub != undefined}
        onValueChange={() => {
          if (dragEndSub == undefined) {
            setDragEndSub(
              Maps.addOnMarkerDragEndedListener(
                ({ id, latitude, longitude }: Maps.MarkerDragEndedEvent) => {
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
              )
            );
          } else {
            Maps.removeAllOnMarkerDragEndedListeners();
            setDragEndSub(undefined);
          }
        }}
      />
      <SwitchContainer
        title="Enable cameraMoveStarted listener"
        value={cameraMoveStartSub != undefined}
        onValueChange={() => {
          if (cameraMoveStartSub == undefined) {
            setCameraMoveStartSub(
              Maps.addOnCameraMoveStartedListener(
                ({ latitude, longitude }: Maps.CameraEvent) => {
                  setSnackbarText(
                    'camera started moving from: ' + latitude + ' ' + longitude
                  );
                }
              )
            );
          } else {
            Maps.removeAllOnCameraMoveStartedListeners();
            setCameraMoveStartSub(undefined);
          }
        }}
      />
      <SwitchContainer
        title="Enable cameraMoveEnded listener"
        value={cameraMoveEndSub != undefined}
        onValueChange={() => {
          if (cameraMoveEndSub == undefined) {
            setCameraMoveEndSub(
              Maps.addOnCameraMoveEndedListener(
                ({ latitude, longitude }: Maps.CameraEvent) => {
                  setSnackbarText(
                    'camera moved to: ' + latitude + ' ' + longitude
                  );
                }
              )
            );
          } else {
            Maps.removeAllOnCameraMoveEndedListeners();
            setCameraMoveEndSub(undefined);
          }
        }}
      />
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
});
