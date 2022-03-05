import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import SettingsContainer from '../components/SettingsContainer';
import SwitchContainer from '../components/SwitchContainer';
import ProviderContext from '../context/ProviderContext';

export default function GesturesExample() {
  const provider = useContext(ProviderContext);

  const [enableRotateGestures, setEnableRotateGestures] =
    useState<boolean>(false);
  const [enableScrollGestures, setEnableScrollGestures] =
    useState<boolean>(false);
  const [enableTiltGestures, setEnableTiltGestures] = useState<boolean>(false);
  const [enableZoomGestures, setEnableZoomGestures] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        enableRotateGestures={false}
        enableScrollGestures={false}
        enableTiltGestures={false}
        enableZoomGestures={false}
      />
      <SettingsContainer>
        <SwitchContainer
          title="Enable rotate gestures"
          value={enableRotateGestures}
          onValueChange={() => setEnableRotateGestures(!enableRotateGestures)}
          textColor="white"
        />
        <SwitchContainer
          title="Enable scroll gestures"
          value={enableScrollGestures}
          onValueChange={() => setEnableScrollGestures(!enableScrollGestures)}
          textColor="white"
        />
        <SwitchContainer
          title="Enable tilt gestures"
          value={enableTiltGestures}
          onValueChange={() => setEnableTiltGestures(!enableTiltGestures)}
          textColor="white"
        />
        <SwitchContainer
          title="Enable zoom gestures"
          value={enableZoomGestures}
          onValueChange={() => setEnableZoomGestures(!enableZoomGestures)}
          textColor="white"
        />
      </SettingsContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  switchContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
