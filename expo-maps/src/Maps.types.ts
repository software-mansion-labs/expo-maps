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
  | 'rosr'
  | 'violet'
  | 'yellow';

export type PolygonProps = PropsWithChildren<{
  points: Point[];
}>;

export type MarkerProps = PropsWithChildren<
  {
    latitude: number;
    longitude: number;
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor?: MarkerColor;
    draggable?: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity?: number;
    zIndex?: number;
  } & Point
>;

export type MarkerObject = {
  type: 'marker';
  title?: string;
  snippet?: string;
  icon?: string;
  defaultMarkerColor: MarkerColor;
  draggable: boolean;
  anchorU?: number;
  anchorV?: number;
  opacity?: number;
  zIndex?: number;
} & Point;

export type PolygonObject = {
  type: 'polygon';
  points: Point[];
};

export type PolylineObject = {
  type: 'polyline';
  points: Point[];
};
