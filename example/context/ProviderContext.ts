import { Providers } from 'expo-maps/build/Maps.types';
import { createContext } from 'react';

const ProviderContext = createContext<Providers>('google');

export default ProviderContext;
