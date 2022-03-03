import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { CircleObject } from './Circle';

export type MapTypes = 'normal' | 'hybrid' | 'satellite' | 'terrain';

export type MapType = {
  mapType: MapTypes;
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

export type Circles = {
  circles: CircleObject[];
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

export type Controls = {
  showZoomControls: boolean;
  showCompass: boolean;
  showMapToolbar: boolean;
  showMyLocationButton: boolean;
  showLevelPicker: boolean;
};

export type GoogleMapsControls = Controls;

export type AppleMapsControls = Omit<Controls, 'showMapToolbar' | 'showZoomControls'>;

export type NativeExpoGoogleMapsViewProps = ViewProps &
  PropsWithChildren<MapType & GoogleMapsStyling & Gestures & Markers & Polygons & Polylines & Circles & GoogleMapsControls>;

export type NativeExpoAppleMapsViewProps = ViewProps &
  PropsWithChildren<MapType & Gestures & Markers & Polygons & Polylines & Circles & AppleMapsControls>;

export type Providers = 'google' | 'apple';

export type Provider = {
  provider: Providers;
};

export type ExpoMapViewProps = ViewProps &
  PropsWithChildren<Partial<Provider & MapType & Controls & GoogleMapsStyling & Gestures>>;

export type DefaultNativeExpoMapViewProps = MapType & Controls & Gestures;

export type ExpoMapState = Markers & Polygons & Polylines & Circles;
