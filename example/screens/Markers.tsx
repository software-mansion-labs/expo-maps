import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';

import * as Maps from 'expo-maps';

type MarkersScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'Markers'
>;

export default function Markers({ route }: MarkersScreenProps) {
  return (
    <View style={styles.container}>
      <Maps.ExpoMap
        style={{ flex: 1, width: '100%' }}
        provider={route.params.provider}
      >
        <Maps.Marker latitude={-33.86} longitude={151.2} />
        <Maps.Marker latitude={-32} longitude={152} />
        <Maps.Marker latitude={30} longitude={79} />
        <Maps.Marker latitude={37} longitude={96} />
        <Maps.Marker latitude={12} longitude={107} />
      </Maps.ExpoMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
