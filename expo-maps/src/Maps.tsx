import React from 'react';
import {
  ExpoMapViewProps,
  MarkerProps,
  MarkerObject,
  MarkerColor,
  PolygonProps,
  PolygonObject,
  PolylineObject,
} from './Maps.types';
import { NativeExpoAppleMapsView, NativeExpoGoogleMapsView } from './NativeExpoMapView';
import { Asset } from 'expo-asset';
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
  state = {
    markers: [],
    polygons: [],
    polylines: [],
  };

  componentDidMount() {
    this.mapChildren();
  }

  private async mapChildren() {
    const childrenArray = React.Children.map(this.props.children, async (child) => {
      if (!isSimpleType(child)) {
        if (instanceOfMarker(child)) {
          let iconPath: Asset | undefined = undefined;
          if (child.props.icon !== undefined) {
            iconPath = await Asset.fromModule(child.props.icon).downloadAsync();
          }

          let markerObject = {
            type: 'marker',
            latitude: child.props.latitude,
            longitude: child.props.longitude,
            title: child.props.title,
            snippet: child.props.snippet,
            icon: iconPath?.localUri,
            defaultMarkerColor: 0,
            draggable: child.props.draggable ? child.props.draggable : false,
            anchorU: child.props.anchorU,
            anchorV: child.props.anchorV,
            opacity: child.props.opacity ? child.props.opacity : 1,
          } as MarkerObject;

          if (child.props.defaultMarkerColor != undefined) {
            if (typeof child.props.defaultMarkerColor === 'number') {
              markerObject.defaultMarkerColor = child.props.defaultMarkerColor!;
            } else {
              markerObject.defaultMarkerColor = mapColor(child.props.defaultMarkerColor);
            }
          }
          return markerObject;
        } else if (instanceOfPolygon(child)) {
          return {
            type: 'polygon',
            points: child.props.points,
          } as PolygonObject;
        } else if (instanceOfPolyline(child)) {
          return {
            type: 'polyline',
            points: child.props.points,
          } as PolylineObject;
        }
      }
      warnIfChildIsIncompatible(child);
      return null;
    });

    if (childrenArray != undefined) {
      let propObjects = await Promise.all(childrenArray);
      this.setState({
        markers: propObjects.filter((elem) => elem?.type === 'marker'),
        polygons: propObjects.filter((elem) => elem?.type === 'polygon'),
        polylines: propObjects.filter((elem) => elem?.type === 'polyline'),
      });
    }
  }

  render() {
    if (Platform.OS == 'ios' && this.props.provider == 'apple') {
      return (
        <NativeExpoAppleMapsView
          {...defaultNativeExpoMapViewProps}
          {...this.props}
          markers={this.state.markers}
          polygons={this.state.polygons}
          polylines={this.state.polylines}
        />
      );
    }

    return (
      <NativeExpoGoogleMapsView
        {...defaultNativeExpoMapViewProps}
        {...this.props}
        jsonStyleString={this.props.googleMapsJsonStyleString ? this.props.googleMapsJsonStyleString : ''}
        markers={this.state.markers}
        polygons={this.state.polygons}
        polylines={this.state.polylines}
      />
    );
  }
}

export class Marker extends React.Component<MarkerProps> {
  render() {
    return null;
  }
}

function mapColor(color: MarkerColor): number {
  switch (color) {
    case 'azure': {
      return 210;
    }
    case 'blue': {
      return 240;
    }
    case 'cyan': {
      return 180;
    }
    case 'green': {
      return 120;
    }
    case 'magenta': {
      return 300;
    }
    case 'orange': {
      return 30;
    }
    case 'rose': {
      return 330;
    }
    case 'violet': {
      return 270;
    }
    case 'yellow': {
      return 60;
    }
  }
  return 0;
}

function instanceOfMarker(child: any): child is Marker {
  if ('type' in child && String(child.type).includes('Marker') && 'props' in child) {
    let props = Object.keys(child.props);
    if (props.includes('latitude') && props.includes('longitude')) {
      return true;
    }
  }
  return false;
}

export class Polygon extends React.Component<PolygonProps> {
  render() {
    return null;
  }
}

function instanceOfPolygon(child: any): child is Polygon {
  if ('type' in child && String(child.type).includes('Polygon') && 'props' in child) {
    return true;
  }
  return false;
}

export class Polyline extends React.Component<PolygonProps> {
  render() {
    return null;
  }
}

function instanceOfPolyline(child: any): child is Polyline {
  if ('type' in child && String(child.type).includes('Polyline') && 'props' in child) {
    return true;
  }
  return false;
}

function warnIfChildIsIncompatible(child: any) {
  if (typeof child == 'string' || typeof child == 'boolean' || typeof child == 'number') {
    console.warn(`Warning! Child of type ${typeof child} isn't valid ExpoMap child!`);
  } else if (child != null && child != undefined) {
    console.log(child.type);
    console.warn(`Warning! Child of type ${(child as React.ReactElement<any>).type} isn't valid ExpoMap child!`);
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
