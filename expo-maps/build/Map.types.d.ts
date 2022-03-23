import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { Point } from './Common.types';
import { CircleObject } from './Circle';
import { ClusterObject } from './Cluster';
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
export declare type Circles = {
    circles: CircleObject[];
};
export declare type Clusters = {
    clusters: ClusterObject[];
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
export declare type Traffic = {
    enableTraffic: boolean;
};
export declare type GoogleMapsControls = Controls;
export declare type ZoomLevels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22;
export declare type CameraPosition = {
    cameraPosition: Point & {
        zoom: ZoomLevels;
        animate: boolean;
    };
};
export declare type AppleMapsControls = Omit<Controls, 'showMapToolbar' | 'showZoomControls'>;
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<MapType & GoogleMapsStyling & Gestures & Markers & Polygons & Polylines & GoogleMapsControls & CameraPosition & Circles & Clusters & Traffic>;
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<MapType & Gestures & Markers & Polygons & Polylines & AppleMapsControls & CameraPosition & Circles & Clusters & Traffic>;
export declare type Providers = 'google' | 'apple';
export declare type Provider = {
    provider: Providers;
};
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures & CameraPosition & Traffic>>;
export declare type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures & CameraPosition & Traffic;
export declare type ExpoMapState = Markers & Polygons & Polylines & Circles & Clusters;
