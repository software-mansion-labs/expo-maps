import React from 'react';
import { ExpoMapViewProps } from './Map.types';
export { Marker } from './Marker';
export { Polygon } from './Polygon';
export { Polyline } from './Polyline';
export declare class ExpoMap extends React.Component<ExpoMapViewProps> {
    state: {
        markers: never[];
        polygons: never[];
        polylines: never[];
    };
    componentDidMount(): void;
    private mapChildren;
    render(): JSX.Element;
}
