import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';

export type NativeExpoGoogleMapsViewProps = ViewProps &
  PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    jsonStyleString: string;
    markers: MarkerObject[];
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
    polygons: PolygonObject[];
    polylines: PolylineObject[];
  }>;

export type NativeExpoAppleMapsViewProps = ViewProps &
  PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    markers: MarkerObject[];
    enableRotateGestures: boolean;
    enableScrollGestures: boolean;
    enableTiltGestures: boolean;
    enableZoomGestures: boolean;
    polygons: PolygonObject[];
    polylines: PolylineObject[];
  }>;

export type ExpoMapViewProps = ViewProps &
  PropsWithChildren<{
    provider?: 'google' | 'apple';
    mapType?: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    googleMapsJsonStyleString?: string;
    enableRotateGestures?: boolean;
    enableScrollGestures?: boolean;
    enableTiltGestures?: boolean;
    enableZoomGestures?: boolean;
  }>;

export type Point = {
  latitude: number;
  longitude: number;
};

export type MarkerColor =
  | 'azure'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'magenta'
  | 'orange'
  | 'red'
  | 'rose'
  | 'violet'
  | 'yellow';

export type PolygonProps = PropsWithChildren<{
  points: Point[];
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokePattern?: PatternItem[];
  jointType?: 'bevel'|'default'|'round';
}>;

export type PolylineProps = PropsWithChildren<{
  points: Point[];
  color?: string;
  width?: number;
  pattern?: PatternItem[];
  jointType?: 'bevel'|'default'|'round';
  capType?: 'butt'|'round'|'square';
}>;

export type MarkerProps = PropsWithChildren<
  {
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor?: number | MarkerColor;
    draggable?: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity?: number;
  } & Point
>;

export type MarkerObject = {
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

export type PolygonObject = {
  type: 'polygon';
  points: Point[];
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokePattern?: PatternItem[];
  jointType?: 'bevel'|'default'|'round';
};

export type PolylineObject = {
  type: 'polyline';
  points: Point[];
  color?: string;
  width?: number;
  pattern?: PatternItem[];
  jointType?: 'bevel'|'default'|'round';
  capType?: 'butt'|'round'|'square';
};
/**
 * PatternItem is used to define a repeating pattern for polyline and polygon line.
 * PatternItem with type 'stroke' and length 0 will represent a dot.
 * Use an array of PatternItem to define a pattern.
 */
export type PatternItem = {
  type: 'stroke' | 'gap';
  length: number;
};