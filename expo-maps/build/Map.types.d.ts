import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { CircleObject } from './Circle';
export declare type MapTypes = 'normal' | 'hybrid' | 'satellite' | 'terrain';
/**
 * Prop for managing map type.
 *
 * @field mapType - type of map (one of normal, hybrid, satellite, terrain')
 */
export declare type MapType = {
    mapType: MapTypes;
};
/**
 * Internal prop for managing markers displayed on the map.
 *
 * @field markers - array of MarkerObjects
 */
export declare type Markers = {
    markers: MarkerObject[];
};
/**
 * Internal prop for managing polygons displayed on the map.
 *
 * @field polygons - array of PolygonObjects
 */
export declare type Polygons = {
    polygons: PolygonObject[];
};
/**
 * Internal prop for managing polylines displayed on the map.
 *
 * @field polylines - array of PolylineObjects
 */
export declare type Polylines = {
    polylines: PolylineObject[];
};
/**
 * Internal prop for managing circles displayed on the map.
 *
 * @field circles - array of CircleObjects
 */
export declare type Circles = {
    circles: CircleObject[];
};
/**
 * Prop for managing Google Maps styling settings.
 *
 * @googleMapsfield googleMapsJsonStyleString - valid Google Maps style JSON string,
 * please use https://mapstyle.withgoogle.com to generate style JSONs
 */
export declare type GoogleMapsStyling = {
    googleMapsJsonStyleString: string;
};
/**
 * Props for managing map gestures settings.
 *
 * @field enableRotateGestures - if `true` rotate gestures are enabled
 *
 * @field enableScrollGestures - if `true` scroll gestures are enabled
 *
 * @field enableTiltGestures - if `true` tilt gestures are enabled
 *
 * @field enableZoomGestures - if `true` zoom gestures are enabled
 */
export declare type Gestures = {
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
};
/**
 * Props for managing map controls settings.
 *
 * @googleMapsfield showZoomControls - if `true` zoom controls are visable
 *
 * @field showCompass - if `true` compass icon is visable
 *
 * @googleMapsfield showMapToolbar - if `true` map toolbar is visable
 *
 * @field showLevelPicker - if `true` level picker is visable when avaliable
 */
export declare type Controls = {
    showZoomControls: boolean;
    showCompass: boolean;
    showMapToolbar: boolean;
    showMyLocationButton: boolean;
    showLevelPicker: boolean;
};
declare type GoogleMapsControls = Controls;
declare type AppleMapsControls = Omit<Controls, 'showMapToolbar' | 'showZoomControls'>;
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<MapType & GoogleMapsStyling & Gestures & Markers & Polygons & Polylines & Circles & GoogleMapsControls>;
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<MapType & Gestures & Markers & Polygons & Polylines & Circles & AppleMapsControls>;
export declare type Providers = 'google' | 'apple';
/**
 * Prop for managing map provider.
 *
 * @field provider - provider you want to use for your map, please note `apple` provider is only avaliable on Apple devices,
 * if `apple` provider is selected on Android device it is ignored
 */
export declare type Provider = {
    provider: Providers;
};
/**
 * General Expo Map props.
 *
 * All of the ExpoMap props are optional, if prop is not explicitly specified default will be used.
 *
 * @field mapType - type of map (one of normal, hybrid, satellite, terrain')
 * @default 'normal'
 *
 * @googleMapsfield googleMapsJsonStyleString - valid Google Maps style JSON string,
 * please use https://mapstyle.withgoogle.com to generate style JSONs
 * @default undefined
 *
 * @field enableRotateGestures - if `true` rotate gestures are enabled
 * @default false
 *
 * @field enableScrollGestures - if `true` scroll gestures are enabled
 * @default true
 *
 * @field enableTiltGestures - if `true` tilt gestures are enabled
 * @default false
 *
 * @field enableZoomGestures - if `true` zoom gestures are enabled
 * @default true
 *
 * TODO more explanations on how zoom controls function
 * @googleMapsfield showZoomControls - if `true` zoom controls are visable
 * @default true
 *
 * @field showCompass - if `true` compass icon is visable
 * @default true
 *
 * @googleMapsfield showMapToolbar - if `true` map toolbar is visable
 * @default true
 *
 * @field showLevelPicker - if `true` level picker is visable when avaliable
 * @default true
 *
 * @field provider - provider you want to use for your map, please note `apple` provider is only avaliable on Apple devices,
 * if `apple` provider is selected on Android device it is ignored
 * @default 'google'
*/
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures>>;
export declare type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures;
export declare type ExpoMapState = Markers & Polygons & Polylines & Circles;
export {};
