import React from 'react';
import { ExpoMapViewProps } from './Maps.types';
import {
  NativeExpoAppleMapsView,
  NativeExpoGoogleMapsView,
} from './NativeExpoMapView';
import { Platform } from 'react-native';

export * from './Maps.types';

export class ExpoMap extends React.Component<ExpoMapViewProps> {
  render() {
    let NativeExpoMapView = NativeExpoGoogleMapsView;
    if (Platform.OS == 'ios' && this.props.provider == 'apple') {
      NativeExpoMapView = NativeExpoAppleMapsView;
    }
    return <NativeExpoMapView {...this.props} />;
  }
}
