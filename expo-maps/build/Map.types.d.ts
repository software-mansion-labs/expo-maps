import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { Point } from './Common.types';
export declare type MapTypes = 'normal' | 'hybrid' | 'satellite' | 'terrain';
export declare type MapType = {
    mapType: MapTypes;
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
export declare type GoogleMapsStyling = {
    googleMapsJsonStyleString: string;
};
export declare type Gestures = {
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
};
export declare type Controls = {
    showZoomControls: boolean;
    showCompass: boolean;
    showMapToolbar: boolean;
    showMyLocationButton: boolean;
    showLevelPicker: boolean;
};
export declare type GoogleMapsControls = Controls;
export declare type CameraPosition = {
    cameraPosition: Point & {
        zoom: number;
        animate: boolean;
    };
};
export declare type AppleMapsControls = Omit<Controls, 'showMapToolbar' | 'showZoomControls'>;
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<MapType & GoogleMapsStyling & Gestures & Markers & Polygons & Polylines & GoogleMapsControls & CameraPosition>;
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<MapType & Gestures & Markers & Polygons & Polylines & AppleMapsControls & CameraPosition>;
export declare type Providers = 'google' | 'apple';
export declare type Provider = {
    provider: Providers;
};
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures & CameraPosition>>;
export declare type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures & CameraPosition;
export declare type ExpoMapState = Markers & Polygons & Polylines;