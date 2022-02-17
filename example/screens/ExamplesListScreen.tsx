import React, { useState } from 'react';
import {
  View,
  Switch,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import ExamplesListItem from '../components/ExamplesListItem';
import { ExamplesStackNavigatorProps } from '../navigators/MainNavigator';
import { CONCRETE_EXAMPLE_SCREENS } from '../constants/ConcreteExampleScreens';
import { Providers } from 'expo-maps/build/Maps.types';

type ExamplesListScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'ExamplesListScreen'
>;

export default function ExamplesListScreen({
  navigation,
}: ExamplesListScreenProps) {
  const [provider, setProvider] = useState<Providers>('google');
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {CONCRETE_EXAMPLE_SCREENS.map(({ name }) => (
          <ExamplesListItem
            key={name}
            name={name}
            onExampleSelect={() => {
              navigation.navigate(name, { provider: provider });
            }}
          />
        ))}
      </ScrollView>
      {Platform.OS === 'ios' && (
        <View style={styles.changeProviderToggle}>
          <Text>Use Apple Maps?</Text>
          <Switch
            style={{ marginTop: 5 }}
            value={provider === 'apple'}
            onChange={() =>
              provider === 'google'
                ? setProvider('apple')
                : setProvider('google')
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  changeProviderToggle: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 100,
  },
});
