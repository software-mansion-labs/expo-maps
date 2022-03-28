import React from 'react';
import {
  NativeExpoAppleMapsView,
  NativeExpoGoogleMapsView,
} from './NativeExpoMapView';
import {
  DefaultNativeExpoMapViewProps,
  ExpoMapState,
  ExpoMapViewProps,
} from './Map.types';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';
import * as Utils from './Utils';
import { Marker, MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { CircleObject } from './Circle';
import { ClusterObject } from './Cluster';
import { KMLObject } from './KML';

export { Marker } from './Marker';
export { Polygon } from './Polygon';
export { Polyline } from './Polyline';
export { Circle } from './Circle';
export { Cluster } from './Cluster';
export { KML } from './KML';

const defaultNativeExpoMapViewProps: DefaultNativeExpoMapViewProps = {
  mapType: 'normal',
  showZoomControls: true,
  showCompass: true,
  showMapToolbar: true,
  showMyLocationButton: true,
  showLevelPicker: true,
  enableRotateGestures: false,
  enableScrollGestures: true,
  enableTiltGestures: false,
  enableZoomGestures: true,
  cameraPosition: {
    latitude: 51.51,
    longitude: 0.13,
    zoom: 4,
    animate: true,
  },
  enableTraffic: false,
};

/**
 * Main map component of Expo Maps library.
 *
 * See {@link ExpoMapViewProps} to learn more about props.
 */
export class ExpoMap extends React.Component<ExpoMapViewProps> {
  state: ExpoMapState = {
    markers: [],
    polygons: [],
    polylines: [],
    circles: [],
    clusters: [],
    kmls: [],
  };
  _ismounted = false;

  componentDidMount() {
    this.mapChildren();
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  componentDidUpdate(_, prevState: ExpoMapState) {
    if (Object.is(this.state, prevState)) {
      this.mapChildren();
    }
  }

  private async mapChildren() {
    const childrenArray = React.Children.map(
      this.props.children,
      async (child) => {
        if (!Utils.isSimpleType(child)) {
          if (Utils.isMarker(child)) {
            return buildMarkerObject(child);
          } else if (Utils.isPolygon(child)) {
            return {
              type: 'polygon',
              points: child.props.points,
              fillColor: child.props.fillColor,
              strokeColor: child.props.strokeColor,
              strokeWidth: child.props.strokeWidth,
              strokePattern: child.props.strokePattern,
              jointType: child.props.jointType,
            } as PolygonObject;
          } else if (Utils.isPolyline(child)) {
            return {
              type: 'polyline',
              points: child.props.points,
              color: child.props.color,
              width: child.props.width,
              pattern: child.props.pattern,
              jointType: child.props.jointType,
              capType: child.props.capType,
            } as PolylineObject;
          } else if (Utils.isCircle(child)) {
            return {
              type: 'circle',
              center: child.props.center,
              radius: child.props.radius,
              fillColor: child.props.fillColor,
              strokeColor: child.props.strokeColor,
              strokeWidth: child.props.strokeWidth,
            } as CircleObject;
          } else if (Utils.isKML(child)) {
            let filePath = await Asset.fromModule(
              child.props.filePath
            ).downloadAsync();
            return {
              type: 'kml',
              filePath: filePath.localUri,
            } as KMLObject;
          } else if (Utils.isCluster(child)) {
            const clusterChildrenArray = React.Children.map(
              child.props.children,
              async (clusterChild) => {
                if (!Utils.isSimpleType(clusterChild)) {
                  if (Utils.isMarker(clusterChild)) {
                    return buildMarkerObject(clusterChild);
                  }
                }
                Utils.warnIfChildIsIncompatible(clusterChild);
                return null;
              }
            );

            if (clusterChildrenArray != undefined) {
              let iconPath: Asset | undefined = undefined;
              if (child.props.icon !== undefined) {
                iconPath = await Asset.fromModule(
                  child.props.icon
                ).downloadAsync();
              }

              let clusterPropObjects = await Promise.all(clusterChildrenArray);
              var minimumClusterSize: number;

              if (
                child.props.minimumClusterSize !== undefined &&
                child.props.minimumClusterSize > 0
              ) {
                minimumClusterSize = child.props.minimumClusterSize;
              } else {
                minimumClusterSize = 4;
              }

              let clusterObject = {
                type: 'cluster',
                markers: clusterPropObjects,
                name: child.props.name,
                minimumClusterSize: minimumClusterSize,
                markerTitle: child.props.markerTitle,
                markerSnippet: child.props.markerSnippet,
                icon: iconPath?.localUri,
                color: 0,
                opacity: child.props.opacity ? child.props.opacity : 1,
              } as ClusterObject;

              if (child.props.color != undefined) {
                if (typeof child.props.color === 'number') {
                  clusterObject.color = child.props.color!;
                } else {
                  clusterObject.color = Utils.mapColor(child.props.color);
                }
              }
              return clusterObject;
            }
          }
          Utils.warnIfChildIsIncompatible(child);
          return null;
        }
        Utils.warnIfChildIsIncompatible(child);
        return null;
      }
    );

    if (childrenArray != undefined) {
      let propObjects = await Promise.all(childrenArray);
      if (this._ismounted) {
        this.setState({
          markers: propObjects.filter((elem) => elem?.type === 'marker'),
          polygons: propObjects.filter((elem) => elem?.type === 'polygon'),
          polylines: propObjects.filter((elem) => elem?.type === 'polyline'),
          circles: propObjects.filter((elem) => elem?.type === 'circle'),
          clusters: propObjects.filter((elem) => elem?.type === 'cluster'),
          kmls: propObjects.filter((elem) => elem?.type === 'kml'),
        });
      }
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
          circles={this.state.circles}
          clusters={this.state.clusters}
        />
      );
    }

    return (
      <NativeExpoGoogleMapsView
        {...defaultNativeExpoMapViewProps}
        {...this.props}
        googleMapsJsonStyleString={
          this.props.googleMapsJsonStyleString
            ? this.props.googleMapsJsonStyleString
            : ''
        }
        markers={this.state.markers}
        polygons={this.state.polygons}
        polylines={this.state.polylines}
        circles={this.state.circles}
        clusters={this.state.clusters}
        kmls={this.state.kmls}
      />
    );
  }
}

async function buildMarkerObject(child: Marker): Promise<MarkerObject> {
  let iconPath: Asset | undefined = undefined;
  if (child.props.icon !== undefined) {
    iconPath = await Asset.fromModule(child.props.icon).downloadAsync();
  }

  let markerObject = {
    type: 'marker',
    latitude: child.props.latitude,
    longitude: child.props.longitude,
    markerTitle: child.props.markerTitle,
    markerSnippet: child.props.markerSnippet,
    icon: iconPath?.localUri,
    color: 0,
    draggable: child.props.draggable ? child.props.draggable : false,
    anchorU: child.props.anchorU,
    anchorV: child.props.anchorV,
    opacity: child.props.opacity ? child.props.opacity : 1,
  } as MarkerObject;

  if (child.props.color != undefined) {
    if (typeof child.props.color === 'number') {
      markerObject.color = child.props.color!;
    } else {
      markerObject.color = Utils.mapColor(child.props.color);
    }
  }
  return markerObject;
}
