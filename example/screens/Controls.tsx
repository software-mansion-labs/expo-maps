import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';

import * as Maps from 'expo-maps';

type ControlsScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'Controls'
>;

export default function Controls({ route }: ControlsScreenProps) {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={route.params.provider}
        showZoomControls={true}
        showCompass={true}
        showMyLocationButton={true}
        showLevelPicker={true}
        showMapToolbar={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
