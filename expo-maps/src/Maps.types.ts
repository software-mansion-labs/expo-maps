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

export type MarkerObject = {
  type: 'marker';
} & Point;

export type MarkerProps = PropsWithChildren<Point>;

export type PolygonProps = PropsWithChildren<{
  points: Point[];
}>;

export type PolygonObject = {
  type: 'polygon';
  points: Point[];
};
