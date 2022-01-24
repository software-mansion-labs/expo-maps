import React from 'react';
import { ExpoMapViewProps, ExpoMarkerProps } from './Maps.types';
export * from './Maps.types';
export declare class ExpoMap extends React.Component<ExpoMapViewProps> {
    private mapChildren;
    render(): JSX.Element;
}
export declare class ExpoMarker extends React.Component<ExpoMarkerProps> {
    render(): null;
}
