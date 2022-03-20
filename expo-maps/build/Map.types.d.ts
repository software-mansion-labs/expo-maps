import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { CircleObject } from './Circle';
/**
 * Avaliable map types used in Expo Maps
 *
 * @value `normal` | `hybrid` | `satellite` | `terrain`
 */
export declare type MapTypes = 'normal' | 'hybrid' | 'satellite' | 'terrain';
/**
 * Prop for managing map type
 *
 * @ExpoMapsField mapType - see MapTypes type to learn more about avaliable map types in Expo Maps
 */
export declare type MapType = {
    mapType: MapTypes;
};
/**
 * Prop for managing markers displayed on the map
 *
 * @ExpoMapsField markers - array of MarkerObjects
 */
export declare type Markers = {
    markers: MarkerObject[];
};
/**
 * Prop for managing polygons displayed on the map
 *
 * @ExpoMapsField polygons - array of PolygonObjects
 */
export declare type Polygons = {
    polygons: PolygonObject[];
};
/**
 * Prop for managing polylines displayed on the map
 *
 * @ExpoMapsField polylines - array of PolylineObjects
 */
export declare type Polylines = {
    polylines: PolylineObject[];
};
/**
 * Prop for managing circles displayed on the map
 *
 * @ExpoMapsField circles - array of CircleObjects
 */
export declare type Circles = {
    circles: CircleObject[];
};
/**
 * Prop for managing Google Maps styling settings
 *
 * @GoogleMapsField googleMapsJsonStyleString - valid Google Maps style JSON string,
 * please use https://mapstyle.withgoogle.com to generate style JSONs
 */
export declare type GoogleMapsStyling = {
    googleMapsJsonStyleString: string;
};
/**
 * Props for managing map gestures settings
 *
 * @ExpoMapsField enableRotateGestures - if `true` rotate gestures are enabled
 *
 * @ExpoMapsField enableScrollGestures - if `true` scroll gestures are enabled
 *
 * @ExpoMapsField enableTiltGestures - if `true` tilt gestures are enabled
 *
 * @ExpoMapsField enableZoomGestures - if `true` zoom gestures are enabled
 */
export declare type Gestures = {
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
};
/**
 * Props for managing map controls settings
 *
 * @GoogleMapsField showZoomControls - if `true` zoom controls are visable
 *
 * @ExpoMapsField showCompass - if `true` compass icon is visable
 *
 * @GoogleMapsField showMapToolbar - if `true` map toolbar is visable
 *
 * @ExpoMapsField showLevelPicker - if `true` level picker is visable when avaliable
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
/**
 * Avaliable map providers
 *
 * @value `google` | `apple` - please note `apple` provider is only avaliable on Apple devices
 */
export declare type Providers = 'google' | 'apple';
/**
 * Prop for managing map provider
 *
 * @ExpoMapsField provider - provider you want to use for your map, please note `apple` provider is only avaliable on Apple devices
 */
export declare type Provider = {
    provider: Providers;
};
/**
 * General Expo Map props
 *
 * Please see subtypes documentation for more details
 */
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures>>;
export declare type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures;
export declare type ExpoMapState = Markers & Polygons & Polylines & Circles;
export {};
