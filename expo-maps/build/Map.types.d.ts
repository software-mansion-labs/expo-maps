import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { Point } from './Common.types';
import { CircleObject } from './Circle';
import { ClusterObject } from './Cluster';
export declare type MapTypes = 'normal' | 'hybrid' | 'satellite' | 'terrain';
/**
 * Prop for managing map type.
 */
export declare type MapType = {
    /**
     * Type of map (one of normal, hybrid, satellite, terrain').
     *
     * @default 'normal'
     */
    mapType: MapTypes;
};
/**
 * Internal prop for managing markers displayed on the map.
 */
export declare type Markers = {
    /**
     * Array of {@link MarkerObject}.
     */
    markers: MarkerObject[];
};
/**
 * Internal prop for managing polygons displayed on the map.
 */
export declare type Polygons = {
    /**
     * Array of {@link PolygonObject}.
     */
    polygons: PolygonObject[];
};
/**
 * Internal prop for managing polylines displayed on the map.
 */
export declare type Polylines = {
    /**
     * Array of {@link PolylineObject}.
     */
    polylines: PolylineObject[];
};
/**
 * Internal prop for managing circles displayed on the map.
 */
export declare type Circles = {
    /**
     * Array of {@link CircleObject}.
     */
    circles: CircleObject[];
};
/**
 * Internal prop for managing clusters displayed on the map.
 */
export declare type Clusters = {
    /**
     * Array of {@link ClusterObject}.
     */
    clusters: ClusterObject[];
};
/**
 * Prop for managing Google Maps styling settings.
 */
export declare type GoogleMapsStyling = {
    /**
     * Valid Google Maps style JSON string,
     * please use https://mapstyle.withgoogle.com to generate style JSONs.
     *
     * This prop works only when provider == `google`.
     */
    googleMapsJsonStyleString: string;
};
/**
 * Props for managing map gestures settings.
 */
export declare type Gestures = {
    /**
     * If `true` rotate gestures are enabled.
     *
     * @default false
     */
    enableRotateGestures: boolean;
    /**
     * If `true` scroll gestures are enabled.
     *
     * @default true
     */
    enableScrollGestures: boolean;
    /**
     * If `true` tilt gestures are enabled.
     *
     * @default false
     */
    enableTiltGestures: boolean;
    /**
     * If `true` zoom gestures are enabled.
     *
     * @default true
     */
    enableZoomGestures: boolean;
};
/**
 * Props for managing map controls settings.
 */
export declare type Controls = {
    /**
     * If `true` zoom controls are visible.
     *
     * This prop works only when provider == `google`.
     *
     * @default true
     */
    showZoomControls: boolean;
    /**
     * If `true` compass icon can be visible.
     *
     * It appears only when map is moved so that it is not facing north.
     *
     * @default true
     */
    showCompass: boolean;
    /**
     * If `true` map toolbar can be visible.
     *
     * It is visible when a marker is tapped and hidden when the marker is no longer in focus.
     *
     * This prop works only when provider == `google`.
     *
     * @default true
     */
    showMapToolbar: boolean;
    /**
     * If `true` map toolbar can be visible.
     *
     * It is visble when map can access user location.
     *
     * @default true
     */
    showMyLocationButton: boolean;
    /**
     * TODO when functionality fully added
     *
     * @default true
     */
    showLevelPicker: boolean;
};
export declare type Traffic = {
    enableTraffic: boolean;
};
export declare type GoogleMapsControls = Controls;
export declare type ZoomLevels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22;
/**
 * Prop for setting camera position.
 */
export declare type CameraPosition = {
    /**
     * Camera position object
     *
     * @default London
     */
    cameraPosition: Point & {
        /**
         * Zoom level. Number from range 1-22.
         */
        zoom: ZoomLevels;
        /**
         * Indicates if camera should be gently animated from old position to new one or maybe "teleported".
         */
        animate: boolean;
    };
};
export declare type AppleMapsControls = Omit<Controls, 'showMapToolbar' | 'showZoomControls'>;
/**
 * Props for Google Maps implementation.
 */
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<MapType & GoogleMapsStyling & Gestures & Markers & Polygons & Polylines & GoogleMapsControls & CameraPosition & Circles & Clusters & Traffic>;
/**
 * Props for Apple Maps implementation.
 */
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<MapType & Gestures & Markers & Polygons & Polylines & AppleMapsControls & CameraPosition & Circles & Clusters & Traffic>;
export declare type Providers = 'google' | 'apple';
/**
 * Prop for managing map provider.
 */
export declare type Provider = {
    /**
     * Provider you want to use for your map, please note `apple` provider is only avaliable on Apple devices.
     *
     * @default 'google'
     */
    provider: Providers;
};
/**
 * General Expo Map props.
 *
 * All of the ExpoMap props are optional.
*/
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures & CameraPosition & Traffic>>;
export declare type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures & CameraPosition & Traffic;
export declare type ExpoMapState = Markers & Polygons & Polylines & Circles & Clusters;
