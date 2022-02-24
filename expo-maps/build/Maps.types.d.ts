import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    jsonStyleString: string;
    markers: MarkerObject[];
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
    polygons: PolygonObject[];
    polylines: PolylineObject[];
    circles: CircleObject[];
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
    circles: CircleObject[];
}>;
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<{
    provider?: 'google' | 'apple';
    mapType?: 'normal' | 'hybrid' | 'satellite' | 'terrain';
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
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    strokePattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
}>;
export declare type PolylineProps = PropsWithChildren<{
    points: Point[];
    color?: string;
    width?: number;
    pattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
    capType?: 'butt' | 'round' | 'square';
}>;
export declare type CircleProps = PropsWithChildren<{
    center: Point;
    radius: number;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
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
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    strokePattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
};
export declare type PolylineObject = {
    type: 'polyline';
    points: Point[];
    color?: string;
    width?: number;
    pattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
    capType?: 'butt' | 'round' | 'square';
};
/**
 * PatternItem is used to define a repeating pattern for polyline and polygon line.
 * PatternItem with type 'stroke' and length 0 will represent a dot.
 * Use an array of PatternItem to define a pattern.
 */
export declare type PatternItem = {
    type: 'stroke' | 'gap';
    length: number;
};
export declare type CircleObject = {
    type: 'circle';
    center: Point;
    radius: number;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
};
