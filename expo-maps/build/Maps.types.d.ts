import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
export declare type MapTypes = 'normal' | 'hybrid' | 'satellite' | 'terrain';
export declare type MapType = {
    mapType: MapTypes;
};
export declare type GoogleMapsStyling = {
    googleMapsJsonStyleString: string;
};
export declare type Gestures = {
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
};
export declare type Markers = {
    markers: MarkerObject[];
};
export declare type Polygons = {
    polygons: PolygonObject[];
};
export declare type Polylines = {
    polylines: PolylineObject[];
};
export declare type Controls = {
    showZoomControls: boolean;
    showCompass: boolean;
    showMapToolbar: boolean;
    showMyLocationButton: boolean;
    showLevelPicker: boolean;
};
export declare type GoogleMapsControls = Controls;
export declare type AppleMapsControls = Omit<Controls, 'showMapToolbar' | 'showZoomControls'>;
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<MapType & GoogleMapsStyling & Gestures & Markers & Polygons & Polylines & GoogleMapsControls>;
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<MapType & Gestures & Markers & Polygons & Polylines & AppleMapsControls>;
export declare type Providers = 'google' | 'apple';
export declare type Provider = {
    provider: Providers;
};
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures>>;
export declare type Point = {
    latitude: number;
    longitude: number;
};
export declare type MarkerColor = 'azure' | 'blue' | 'cyan' | 'green' | 'magenta' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
export declare type PolygonProps = PropsWithChildren<{
    points: Point[];
}>;
export declare type MarkerOptions = {
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor: number | MarkerColor;
    draggable: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity?: number;
};
export declare type MarkerProps = PropsWithChildren<MarkerOptions & Point>;
export declare type MarkerObject = {
    type: 'marker';
} & MarkerOptions & Point;
export declare type PolygonObject = {
    type: 'polygon';
    points: Point[];
};
export declare type PolylineObject = {
    type: 'polyline';
    points: Point[];
};
export declare type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures;
export declare type ExpoMapState = Markers & Polygons & Polylines;
