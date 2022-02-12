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
import { SafeAreaView } from 'react-native-safe-area-context';

type ExamplesListScreenProps = StackScreenProps<
  ExamplesStackNavigatorProps,
  'ExamplesListScreen'
>;

export default function ExamplesListScreen({
  navigation,
}: ExamplesListScreenProps) {
  const [provider, setProvider] = useState<'google' | 'apple'>('google');
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
        <SafeAreaView style={styles.changeProviderToggle}>
          <Text>Use Apple Maps?</Text>
          <Switch
            value={provider === 'apple'}
            onChange={() =>
              provider === 'google'
                ? setProvider('apple')
                : setProvider('google')
            }
          />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  changeProviderToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 120,
  },
});
