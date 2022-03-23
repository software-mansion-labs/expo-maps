import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import SwitchContainer from '../components/SwitchContainer';
import SettingsContainer from '../components/SettingsContainer';
import ProviderContext from '../context/ProviderContext';
import Colors from '../constants/Colors';

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
        showZoomControls={showZoomControls}
        showCompass={showCompass}
        showMyLocationButton={showMyLocationButton}
        showLevelPicker={showLevelPicker}
        showMapToolbar={showMapToolbar}
      />
      <SettingsContainer>
        {provider == 'google' && (
          <SwitchContainer
            title="Show zoom controls"
            value={showZoomControls}
            onValueChange={() => setShowZoomControls(!showZoomControls)}
            textColor={Colors.white}
          />
        )}
        <SwitchContainer
          title="Show compass"
          value={showCompass}
          onValueChange={() => setShowCompass(!showCompass)}
          textColor={Colors.white}
        />
        <SwitchContainer
          title="Show my location button"
          value={showMyLocationButton}
          onValueChange={() => setShowMyLocationButton(!showMyLocationButton)}
          textColor={Colors.white}
        />
        <SwitchContainer
          title="Show level picker"
          value={showLevelPicker}
          onValueChange={() => setShowLevelPicker(!showLevelPicker)}
          textColor={Colors.white}
        />
        {provider == 'google' && (
          <SwitchContainer
            title="Show map toolbar"
            value={showMapToolbar}
            onValueChange={() => setShowMapToolbar(!showMapToolbar)}
            textColor={Colors.white}
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
