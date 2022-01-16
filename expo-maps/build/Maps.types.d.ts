import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    zoomControls: boolean;
    compass: boolean;
    mapToolbar: boolean;
    myLocationButton: boolean;
    levelPicker: boolean;
    jsonStyleString: string;
    markers: MarkerObject[];
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
    polygons: PolygonObject[];
    polylines: PolylineObject[];
}>;
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    markers: MarkerObject[];
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
    polygons: PolygonObject[];
    polylines: PolylineObject[];
}>;
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<{
    provider?: 'google' | 'apple';
    mapType?: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    zoomControls?: boolean;
    compass?: boolean;
    mapToolbar?: boolean;
    myLocationButton?: boolean;
    levelPicker?: boolean;
    googleMapsJsonStyleString?: string;
    enableRotateGestures?: boolean;
    enableScrollGestures?: boolean;
    enableTiltGestures?: boolean;
    enableZoomGestures?: boolean;
}>;
export declare type Point = {
    latitude: number;
    longitude: number;
};
export declare type MarkerColor = 'azure' | 'blue' | 'cyan' | 'green' | 'magenta' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
export declare type PolygonProps = PropsWithChildren<{
    points: Point[];
}>;
export declare type MarkerProps = PropsWithChildren<{
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor?: number | MarkerColor;
    draggable?: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity?: number;
} & Point>;
export declare type MarkerObject = {
    type: 'marker';
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor: number;
    draggable: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity: number;
} & Point;
export declare type PolygonObject = {
    type: 'polygon';
    points: Point[];
};
export declare type PolylineObject = {
    type: 'polyline';
    points: Point[];
};
