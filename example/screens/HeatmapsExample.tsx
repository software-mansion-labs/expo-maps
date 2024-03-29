import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Maps from 'expo-maps';
import ProviderContext from '../context/ProviderContext';

import * as points from '../assets/points.json';
import * as pointsWithData from '../assets/pointsWithData.json';

export default function HeatmapExample() {
  const provider = useContext(ProviderContext);

  return (
    <View style={styles.container}>
      <Maps.ExpoMap style={{ flex: 1, width: '100%' }} provider={provider}>
        <Maps.Heatmap
          points={require("../assets/points.json")}
          radius={20}
          gradient={{colors: ["#12345600","#abcdef"], locations: [0,1]}}
        />
        <Maps.Heatmap
          points={require("../assets/pointsWithData.json")}
          radius={50}
        />
      </Maps.ExpoMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
