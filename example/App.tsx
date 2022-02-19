import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigators/MainNavigator';
import { Platform } from 'react-native';
import { Providers } from 'expo-maps/build/Map.types';
import SettingsContainer from './components/SettingsContainer';
import SwitchContainer from './components/SwitchContainer';
import ProviderContext from './context/ProviderContext';
import * as Location from 'expo-location';

export default function App() {
  const [provider, setProvider] = useState<Providers>('google');

  // it should be done as a part of library, just for now in example app
  const getLocationPermissions = async () => {
    await Location.requestForegroundPermissionsAsync();
  };

  useEffect(() => {
    getLocationPermissions();
  }, []);

  return (
    <ProviderContext.Provider value={provider}>
      <NavigationContainer>
        <MainNavigator />
        {Platform.OS === 'ios' && (
          <SettingsContainer style={{ backgroundColor: 'white' }}>
            <SwitchContainer
              title='Use Apple Maps'
              value={provider === 'apple'}
              onValueChange={() => setProvider(provider === 'google' ? 'apple' : 'google')}
              textColor='black'
            />
          </SettingsContainer>
        )}
      </NavigationContainer>
    </ProviderContext.Provider>
  );
}
