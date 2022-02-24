import React from 'react';
import { ExpoMapViewProps, MarkerProps, PolygonProps, PolylineProps, CircleProps } from './Maps.types';
export * from './Maps.types';
export declare class ExpoMap extends React.Component<ExpoMapViewProps> {
    state: {
        markers: never[];
        polygons: never[];
        polylines: never[];
        circles: never[];
    };
    componentDidMount(): void;
    private mapChildren;
    render(): JSX.Element;
}
export declare class Marker extends React.Component<MarkerProps> {
    render(): null;
}
export declare class Polygon extends React.Component<PolygonProps> {
    render(): null;
}
export declare class Polyline extends React.Component<PolylineProps> {
    render(): null;
}
export declare class Circle extends React.Component<CircleProps> {
    render(): null;
}
