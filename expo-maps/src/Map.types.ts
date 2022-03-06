import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { Point } from './Common.types';

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

export type CameraPosition = {
  cameraPosition: Point & {
    zoom: number;
    animate: boolean;
  };
};

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
      GoogleMapsControls &
      CameraPosition
  >;

export type NativeExpoAppleMapsViewProps = ViewProps &
  PropsWithChildren<
    MapType &
      Gestures &
      Markers &
      Polygons &
      Polylines &
      AppleMapsControls &
      CameraPosition
  >;

export type Providers = 'google' | 'apple';

export type Provider = {
  provider: Providers;
};

export type ExpoMapViewProps = ViewProps &
  PropsWithChildren<
    Partial<
      Provider &
        MapType &
        Controls &
        GoogleMapsStyling &
        Gestures &
        CameraPosition
    >
  >;

export type DefaultNativeExpoMapViewProps = MapType &
  Controls &
  Gestures &
  CameraPosition;

export type ExpoMapState = Markers & Polygons & Polylines;