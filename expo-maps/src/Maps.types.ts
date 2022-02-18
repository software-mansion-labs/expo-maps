import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';

export type MapTypes = 'normal' | 'hybrid' | 'satellite' | 'terrain';

export type MapType = {
  mapType: MapTypes;
};

export type GoogleMapsStyling = {
  googleMapsJsonStyleString: string;
};

export type Gestures = {
  enableRotateGestures: boolean;
  enableScrollGestures: boolean;
  enableTiltGestures: boolean;
  enableZoomGestures: boolean;
};

export type Markers = {
  markers: MarkerObject[];
};

export type Polygons = {
  polygons: PolygonObject[];
};

export type Polylines = {
  polylines: PolylineObject[];
};

export type Controls = {
  showZoomControls: boolean;
  showCompass: boolean;
  showMapToolbar: boolean;
  showMyLocationButton: boolean;
  showLevelPicker: boolean;
};

export type GoogleMapsControls = Controls;

export type AppleMapsControls = Omit<
  Controls,
  'showMapToolbar' | 'showZoomControls'
>;

export type NativeExpoGoogleMapsViewProps = ViewProps &
  PropsWithChildren<
    MapType &
      GoogleMapsStyling &
      Gestures &
      Markers &
      Polygons &
      Polylines &
      GoogleMapsControls
  >;

export type NativeExpoAppleMapsViewProps = ViewProps &
  PropsWithChildren<
    MapType & Gestures & Markers & Polygons & Polylines & AppleMapsControls
  >;

export type Providers = 'google' | 'apple';

export type Provider = {
  provider: Providers;
};

export type ExpoMapViewProps = ViewProps &
  PropsWithChildren<
    Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures>
  >;

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

export type MarkerOptions = {
  title?: string;
  snippet?: string;
  icon?: string;
  defaultMarkerColor?: number | MarkerColor;
  draggable?: boolean;
  anchorU?: number;
  anchorV?: number;
  opacity?: number;
};

export type MarkerProps = PropsWithChildren<MarkerOptions & Point>;

export type MarkerObject = {
  type: 'marker';
} & MarkerOptions &
  Point;

export type PolygonObject = {
  type: 'polygon';
  points: Point[];
};

export type PolylineObject = {
  type: 'polyline';
  points: Point[];
};

export type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures;

export type ExpoMapState = Markers & Polygons & Polylines;
