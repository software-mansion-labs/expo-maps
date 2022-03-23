import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import SwitchContainer from '../components/SwitchContainer';
import SettingsContainer from '../components/SettingsContainer';
import ProviderContext from '../context/ProviderContext';
import Colors from '../constants/Colors';

export default function TrafficExample() {
  const provider = useContext(ProviderContext);

  const [showTraffic, setShowTraffic] = useState<boolean>(false);

  return (
    <View style={styles.mapContainer}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={provider}
        enableTraffic={showTraffic}
      />
      <SettingsContainer>
        <SwitchContainer
          title="Show traffic"
          value={showTraffic}
          onValueChange={() => setShowTraffic(!showTraffic)}
          textColor={Colors.white}
        />
      </SettingsContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
