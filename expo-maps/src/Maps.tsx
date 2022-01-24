import React from 'react';
import { ExpoMapViewProps, MarkerProps, MarkerObject } from './Maps.types';
import {
  NativeExpoAppleMapsView,
  NativeExpoGoogleMapsView,
} from './NativeExpoMapView';
import { Platform } from 'react-native';

export * from './Maps.types';

interface DefaultNativeExpoMapViewProps {
  mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
}

const defaultNativeExpoMapViewProps: DefaultNativeExpoMapViewProps = {
  mapType: 'normal',
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
        }
      }
      warnIfChildIsIncompatible(child);
      return null;
    });

    return {
      markers: childrenArray
        ? childrenArray.filter((e) => e.type === 'marker')
        : [],
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
  if ('type' in child && String(child.type).includes('Marker')) {
    return true;
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
