import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { Point } from './Common.types';
import { CircleObject } from './Circle';
import { ClusterObject } from './Cluster';

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

export type Clusters = {
  clusters: ClusterObject[];
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

export type ZoomLevels =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;

export type CameraPosition = {
  cameraPosition: Point & {
    zoom: ZoomLevels;
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
      CameraPosition &
      Circles &
      Clusters
  >;

export type NativeExpoAppleMapsViewProps = ViewProps &
  PropsWithChildren<
    MapType &
      Gestures &
      Markers &
      Polygons &
      Polylines &
      AppleMapsControls &
      CameraPosition &
      Circles &
      Clusters
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

export type ExpoMapState = Markers & Polygons & Polylines & Circles & Clusters;
