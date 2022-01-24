import React from 'react';
import { ExpoMapViewProps, ExpoMarkerProps, MarkerObject } from './Maps.types';
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
      if (isNotSimpleType(child)) {
        if (instanceOfExpoMarker(child)) {
          return {
            type: 'marker',
            lat: child.props.latitude,
            lng: child.props.longitude,
          } as MarkerObject;
        }
        return null;
      }
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

export class ExpoMarker extends React.Component<ExpoMarkerProps> {
  render() {
    return null;
  }
}

function instanceOfExpoMarker(object: any): object is ExpoMarker {
  if ('props' in object) {
    return doPropsKeysMatch(['latitude', 'longitude'], object.props);
  }
  return false;
}

function isNotSimpleType(instance: any) {
  return (
    typeof instance != 'string' &&
    typeof instance != 'boolean' &&
    typeof instance != 'number' &&
    instance != null &&
    instance != undefined
  );
}

function doPropsKeysMatch(expectedPropsKeys: string[], props: Object) {
  const propsKeys = Object.keys(props);
  return (
    propsKeys.length === expectedPropsKeys.length &&
    propsKeys.every((value, index) => value === expectedPropsKeys[index])
  );
}
