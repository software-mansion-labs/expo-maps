import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigators/MainNavigator';
import { Platform } from 'react-native';
import { Providers } from 'expo-maps/build/Maps.types';
import SettingsContainer from './components/SettingsContainer';
import SwitchContainer from './components/SwitchContainer';
import ProviderContext from './context/ProviderContext';

export default function App() {
  const [provider, setProvider] = useState<Providers>('google');

  return (
    <ProviderContext.Provider value={provider}>
      <NavigationContainer>
        <MainNavigator />
        {Platform.OS === 'ios' && (
          <SettingsContainer style={{ backgroundColor: 'white' }}>
            <SwitchContainer
              title="Use Apple Maps"
              value={provider === 'apple'}
              onValueChange={() =>
                setProvider(provider === 'google' ? 'apple' : 'google')
              }
              textColor="black"
            />
          </SettingsContainer>
        )}
      </NavigationContainer>
    </ProviderContext.Provider>
  );
}
