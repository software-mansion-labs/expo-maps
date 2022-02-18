import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';

import * as Maps from 'expo-maps';

type GesturesScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'Gestures'
>;

export default function Gestures({ route }: GesturesScreenProps) {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={route.params.provider}
        enableRotateGestures={false}
        enableScrollGestures={false}
        enableTiltGestures={false}
        enableZoomGestures={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
