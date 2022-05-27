import { requireNativeViewManager } from 'expo-modules-core';
import { NativeModulesProxy } from 'expo-modules-core';
import { findNodeHandle } from 'react-native';
import * as React from 'react';

import {
  NativeExpoGoogleMapsViewProps,
  NativeExpoAppleMapsViewProps,
} from './Map.types';

export const NativeExpoGoogleMapsView = requireNativeViewManager(
  'ExpoGoogleMaps'
) as React.ComponentType<NativeExpoGoogleMapsViewProps>;

export const NativeExpoAppleMapsView = requireNativeViewManager(
  'ExpoAppleMaps'
) as React.ComponentType<NativeExpoAppleMapsViewProps>;

export const NativeExpoAppleMapsModule = NativeModulesProxy.ExpoAppleMaps;
export const NativeExpoGoogleMapsModule = NativeModulesProxy.ExpoGoogleMaps;

export type NativeExpoAppleMapsViewType = typeof NativeExpoAppleMapsView;
export type NativeExpoGoogleMapsViewType = typeof NativeExpoGoogleMapsView;
