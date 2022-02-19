import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { NativeExpoGoogleMapsViewProps, NativeExpoAppleMapsViewProps } from './Map.types';

export const NativeExpoGoogleMapsView = requireNativeViewManager(
  'ExpoGoogleMaps'
) as React.FC<NativeExpoGoogleMapsViewProps>;

export const NativeExpoAppleMapsView = requireNativeViewManager(
  'ExpoAppleMaps'
) as React.FC<NativeExpoAppleMapsViewProps>;
