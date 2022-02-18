import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';

import * as Maps from 'expo-maps';

type GoogleMapsStylingScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'Google Maps Styling'
>;

export default function GoogleMapsStyling({
  route,
}: GoogleMapsStylingScreenProps) {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider="google"
        googleMapsJsonStyleString={JSON.stringify(
          require('../assets/exampleMapStyle.json')
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
