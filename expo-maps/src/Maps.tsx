import React from 'react';
import { ExpoMapViewProps } from './Maps.types';
import NativeExpoMapView from './NativeExpoMapView';

export * from './Maps.types';

export class ExpoMap extends React.Component<ExpoMapViewProps> {
  render() {
    return <NativeExpoMapView {...this.props} />;
  }
}
