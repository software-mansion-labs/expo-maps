import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import SettingsContainer from '../components/SettingsContainer';
import Colors from '../constants/Colors';
import { Point } from 'expo-maps/src/Common.types';
import SwitchContainer from '../components/SwitchContainer';
import { ZoomLevels } from 'expo-maps/src/Map.types';

type CameraExampleLocationCities =
  | 'Warsaw'
  | 'Madrid'
  | 'New York'
  | 'San Francisco';

interface Coordinates {
  Warsaw: Point;
  Madrid: Point;
  'New York': Point;
  'San Francisco': Point;
}

const COORDINATES: Coordinates = {
  Warsaw: {
    latitude: 52.24,
    longitude: 21.01,
  },
  Madrid: {
    latitude: 40.42,
    longitude: -3.7,
  },
  'New York': {
    latitude: 40.73,
    longitude: -73.93,
  },
  'San Francisco': {
    latitude: 37.77,
    longitude: -122.43,
  },
};

const AVALIABLE_ZOOM_LEVELS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

export default function CameraPositionExample() {
  const provider = useContext(ProviderContext);

  const [cameraExampleLocationCity, setCameraExampleLocationCity] =
    useState<CameraExampleLocationCities>('Warsaw');
  const [zoom, setZoom] = useState<ZoomLevels>(5);
  const [animate, setAnimate] = useState<boolean>(true);
  const [openCameraPositionDropdown, setOpenCameraPositionDropdown] =
    useState<boolean>(false);
  const [openZoomDropdown, setOpenZoomDropdown] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        cameraPosition={{
          latitude: COORDINATES[cameraExampleLocationCity].latitude,
          longitude: COORDINATES[cameraExampleLocationCity].longitude,
          zoom: zoom,
          animate: animate,
        }}
      />
      <SettingsContainer>
        <DropDownPicker
          items={[
            { label: 'Warsaw', value: 'Warsaw' },
            { label: 'Madrid', value: 'Madrid' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' },
          ]}
          value={cameraExampleLocationCity}
          setValue={(value) =>
            setCameraExampleLocationCity(value as CameraExampleLocationCities)
          }
          multiple={false}
          open={openCameraPositionDropdown}
          setOpen={() =>
            setOpenCameraPositionDropdown(!openCameraPositionDropdown)
          }
          placeholder={cameraExampleLocationCity}
          style={{
            backgroundColor: Colors.gray,
            borderColor: Colors.white,
            shadowColor: Colors.white,
            marginBottom: 5,
          }}
          textStyle={{
            color: Colors.white,
          }}
          listItemContainerStyle={{
            backgroundColor: Colors.gray,
          }}
        />
        <DropDownPicker
          items={AVALIABLE_ZOOM_LEVELS.map((zl) => {
            return { label: String(zl), value: zl } as ItemType;
          })}
          value={zoom}
          setValue={(value) => setZoom(value as ZoomLevels)}
          multiple={false}
          open={openZoomDropdown}
          setOpen={() => setOpenZoomDropdown(!openZoomDropdown)}
          placeholder={String(zoom)}
          style={{
            backgroundColor: Colors.gray,
            borderColor: Colors.white,
            shadowColor: Colors.white,
            marginBottom: 5,
          }}
          textStyle={{
            color: Colors.white,
          }}
          listItemContainerStyle={{
            backgroundColor: Colors.gray,
          }}
        />
        <SwitchContainer
          title="Animate"
          value={animate}
          onValueChange={() => setAnimate(!animate)}
          textColor={Colors.white}
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
