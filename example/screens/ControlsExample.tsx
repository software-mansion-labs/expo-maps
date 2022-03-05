import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import SwitchContainer from '../components/SwitchContainer';
import SettingsContainer from '../components/SettingsContainer';
import ProviderContext from '../context/ProviderContext';

export default function ControlsExample() {
  const provider = useContext(ProviderContext);

  const [showZoomControls, setShowZoomControls] = useState<boolean>(false);
  const [showCompass, setShowCompass] = useState<boolean>(false);
  const [showMyLocationButton, setShowMyLocationButton] =
    useState<boolean>(false);
  const [showLevelPicker, setShowLevelPicker] = useState<boolean>(false);
  const [showMapToolbar, setShowMapToolbar] = useState<boolean>(false);

  return (
    <View style={styles.mapContainer}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        showZoomControls={true}
        showCompass={true}
        showMyLocationButton={true}
        showLevelPicker={true}
        showMapToolbar={true}
      />
      <SettingsContainer>
        {provider == 'google' && (
          <SwitchContainer
            title="Show zoom controls"
            value={showZoomControls}
            onValueChange={() => setShowZoomControls(!showZoomControls)}
            textColor="white"
          />
        )}
        <SwitchContainer
          title="Show compass"
          value={showCompass}
          onValueChange={() => setShowCompass(!showCompass)}
          textColor="white"
        />
        <SwitchContainer
          title="Show my location button"
          value={showMyLocationButton}
          onValueChange={() => setShowMyLocationButton(!showMyLocationButton)}
          textColor="white"
        />
        <SwitchContainer
          title="Show level picker"
          value={showLevelPicker}
          onValueChange={() => setShowLevelPicker(!showLevelPicker)}
          textColor="white"
        />
        {provider == 'google' && (
          <SwitchContainer
            title="Show map toolbar"
            value={showMapToolbar}
            onValueChange={() => setShowMapToolbar(!showMapToolbar)}
            textColor="white"
          />
        )}
      </SettingsContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
