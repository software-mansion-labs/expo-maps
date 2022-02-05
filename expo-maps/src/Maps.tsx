import React from 'react';
import {
  ExpoMapViewProps,
  MarkerProps,
  MarkerObject,
  PolygonProps,
  PolygonObject,
} from './Maps.types';
import {
  NativeExpoAppleMapsView,
  NativeExpoGoogleMapsView,
} from './NativeExpoMapView';
import { Platform } from 'react-native';

export * from './Maps.types';

interface DefaultNativeExpoMapViewProps {
  mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
  enableRotateGestures: boolean;
  enableScrollGestures: boolean;
  enableTiltGestures: boolean;
  enableZoomGestures: boolean;
}

const defaultNativeExpoMapViewProps: DefaultNativeExpoMapViewProps = {
  mapType: 'normal',
  enableRotateGestures: false,
  enableScrollGestures: true,
  enableTiltGestures: false,
  enableZoomGestures: true,
};

export class ExpoMap extends React.Component<ExpoMapViewProps> {
  private mapChildren() {
    const childrenArray = React.Children.map(this.props.children, (child) => {
      if (!isSimpleType(child)) {
        if (instanceOfMarker(child)) {
          return {
            type: 'marker',
            latitude: child.props.latitude,
            longitude: child.props.longitude,
          } as MarkerObject;
        } else if (instanceOfPolygon(child)) {
          return {
            type: 'polygon',
            points: child.props.points,
          } as PolygonObject;
        }
      }
      warnIfChildIsIncompatible(child);
      return null;
    });

    return {
      markers: (childrenArray
        ? childrenArray.filter((e) => e.type === 'marker')
        : []) as MarkerObject[],
      polygons: (childrenArray
        ? childrenArray.filter((e) => e.type === 'polygon')
        : []) as PolygonObject[],
    };
  }

  render() {
    const childrenObj = this.mapChildren();

    if (Platform.OS == 'ios' && this.props.provider == 'apple') {
      return (
        <NativeExpoAppleMapsView
          {...defaultNativeExpoMapViewProps}
          {...this.props}
          markers={childrenObj.markers}
          polygons={childrenObj.polygons}
        />
      );
    }

    return (
      <NativeExpoGoogleMapsView
        {...defaultNativeExpoMapViewProps}
        {...this.props}
        jsonStyleString={
          this.props.googleMapsJsonStyleString
            ? this.props.googleMapsJsonStyleString
            : ''
        }
        markers={childrenObj.markers}
        polygons={childrenObj.polygons}
      />
    );
  }
}

export class Marker extends React.Component<MarkerProps> {
  render() {
    return null;
  }
}

function instanceOfMarker(child: any): child is Marker {
  if (
    'type' in child &&
    String(child.type).includes('Marker') &&
    'props' in child
  ) {
    return arePropsKeysEqual(Object.keys(child.props), [
      'latitude',
      'longitude',
    ]);
  }
  return false;
}

export class Polygon extends React.Component<PolygonProps> {
  render() {
    return null;
  }
}

function instanceOfPolygon(child: any): child is Polygon {
  if (
    'type' in child &&
    String(child.type).includes('Polygon') &&
    'props' in child
  ) {
    return arePropsKeysEqual(Object.keys(child.props), ['points']);
  }
  return false;
}

function warnIfChildIsIncompatible(child: any) {
  if (
    typeof child == 'string' ||
    typeof child == 'boolean' ||
    typeof child == 'number'
  ) {
    console.warn(
      `Warning! Child of type ${typeof child} isn't valid ExpoMap child!`
    );
  } else if (child != null && child != undefined) {
    console.log(child.type);
    console.warn(
      `Warning! Child of type ${
        (child as React.ReactElement<any>).type
      } isn't valid ExpoMap child!`
    );
  }
}

function isSimpleType(child: any) {
  return (
    typeof child == 'string' ||
    typeof child == 'boolean' ||
    typeof child == 'number' ||
    child == null ||
    child == undefined
  );
}

function arePropsKeysEqual(
  expectedPropsKeys: string[],
  actualPropsKeys: string[]
) {
  return (
    actualPropsKeys.length === expectedPropsKeys.length &&
    actualPropsKeys.every((value, index) => value === expectedPropsKeys[index])
  );
}
