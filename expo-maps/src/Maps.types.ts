import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';

export type NativeExpoGoogleMapsViewProps = ViewProps &
  PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    showZoomControls: boolean;
    showCompass: boolean;
    showMapToolbar: boolean;
    showMyLocationButton: boolean;
    showLevelPicker: boolean;
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
    showCompass: boolean;
    showMyLocationButton: boolean;
    showLevelPicker: boolean;
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
    showZoomControls?: boolean;
    showCompass?: boolean;
    showMapToolbar?: boolean;
    showMyLocationButton?: boolean;
    showLevelPicker?: boolean;
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
};

export type PolylineObject = {
  type: 'polyline';
  points: Point[];
};
