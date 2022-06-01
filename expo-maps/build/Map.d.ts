import React from 'react';
import { ExpoMapState, ExpoMapViewProps } from './Map.types';
export { Marker } from './Marker';
export { Polygon } from './Polygon';
export { Polyline } from './Polyline';
export { Circle } from './Circle';
export { Cluster } from './Cluster';
export { KML } from './KML';
export { GeoJson } from './GeoJson';
export { ExpoMapRef } from './Map.types';
export { POICategoryType } from './Map.types';
export { Heatmap } from './Heatmap';
/**
 * Main map component of Expo Maps library.
 *
 * See {@link ExpoMapViewProps} to learn more about props.
 */
export declare class ExpoMap extends React.Component<ExpoMapViewProps> {
    state: ExpoMapState;
    _ismounted: boolean;
    mapView: React.RefObject<ExpoMap>;
    getSearchCompletions(queryFragment: string): Promise<void>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(_: any, prevState: ExpoMapState): void;
    private mapChildren;
    render(): JSX.Element;
}
