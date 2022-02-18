import React from 'react';
import { ExpoMapViewProps, MarkerProps, PolygonProps } from './Maps.types';
export declare class ExpoMap extends React.Component<ExpoMapViewProps> {
    state: {
        markers: never[];
        polygons: never[];
        polylines: never[];
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    private mapChildren;
    render(): JSX.Element;
}
export declare class Marker extends React.Component<MarkerProps> {
    render(): null;
}
export declare class Polygon extends React.Component<PolygonProps> {
    render(): null;
}
export declare class Polyline extends React.Component<PolygonProps> {
    render(): null;
}
