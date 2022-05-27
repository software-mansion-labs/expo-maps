import React from 'react';
import {
  NativeExpoAppleMapsView,
  NativeExpoAppleMapsModule,
  NativeExpoAppleMapsViewType,
  NativeExpoGoogleMapsView,
  NativeExpoGoogleMapsModule,
  NativeExpoGoogleMapsViewType,
} from './NativeExpoMapView';
import {
  DefaultNativeExpoMapViewProps,
  ExpoMapState,
  ExpoMapViewProps,
} from './Map.types';
import { Asset } from 'expo-asset';
import { Platform, findNodeHandle } from 'react-native';
import * as Utils from './Utils';
import { Marker, MarkerObject } from './Marker';
import { PolygonObject } from './Polygon';
import { PolylineObject } from './Polyline';
import { CircleObject } from './Circle';
import { ClusterObject } from './Cluster';
import { KMLObject } from './KML';
import { GeoJson, GeoJsonObject } from './GeoJson';
import { Color } from './Common.types';
import { ProxyNativeModule } from 'expo-modules-core';

export { Marker } from './Marker';
export { Polygon } from './Polygon';
export { Polyline } from './Polyline';
export { Circle } from './Circle';
export { Cluster } from './Cluster';
export { KML } from './KML';
export { GeoJson } from './GeoJson';
export { ExpoMapRef } from './Map.types';

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
  initialCameraPosition: {
    latitude: 51.51,
    longitude: 0.13,
    zoom: 4,
    animate: true,
  },
  enableTraffic: false,
  enablePOISearching: false,
  enablePOIDisplay: false,
  enablePOIFilter: [],
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
    geojsons: [],
  };
  _ismounted = false;
  mapView = React.createRef<React.Component<any>>();

  async getSearchCompletions(queryFragment: string) {
    const nodeHandle = findNodeHandle(this.mapView.current);
    var module: ProxyNativeModule;
    if (Platform.OS == 'ios' && this.props.provider == 'apple') {
      module = NativeExpoAppleMapsModule;
    } else {
      module = NativeExpoGoogleMapsModule;
    }

    await module
      .getSearchCompletions(nodeHandle, queryFragment)
      .then((response: [String]) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.log('Error with message: ' + error.message);
      });
  }

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
            const polygonObject = {
              type: 'polygon',
              points: child.props.points,
              fillColor: child.props.fillColor,
              strokeColor: child.props.strokeColor,
              strokeWidth: child.props.strokeWidth,
              strokePattern: child.props.strokePattern,
              jointType: child.props.jointType,
            } as PolygonObject;
            if (
              polygonObject.fillColor != undefined &&
              !Utils.isHexColor(polygonObject.fillColor)
            ) {
              polygonObject.fillColor = Utils.mapColorToHexColor(
                polygonObject.fillColor as Color
              );
            }
            return polygonObject;
          } else if (Utils.isPolyline(child)) {
            const polylineObject = {
              type: 'polyline',
              points: child.props.points,
              color: child.props.color,
              width: child.props.width,
              pattern: child.props.pattern,
              jointType: child.props.jointType,
              capType: child.props.capType,
            } as PolylineObject;
            if (
              polylineObject.color != undefined &&
              !Utils.isHexColor(polylineObject.color)
            ) {
              polylineObject.color = Utils.mapColorToHexColor(
                polylineObject.color as Color
              );
            }
            return polylineObject;
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
          } else if (Utils.isGeoJson(child)) {
            return buildGeoJsonObject(child);
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
                color: child.props.color,
                opacity: child.props.opacity ? child.props.opacity : 1,
              } as ClusterObject;

              if (
                clusterObject.color != undefined &&
                !Utils.isHexColor(clusterObject.color)
              ) {
                clusterObject.color = Utils.mapColorToHexColor(
                  clusterObject.color as Color,
                  '#ff0000'
                );
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
          geojsons: propObjects.filter((elem) => elem?.type === 'geojson'),
        });
      }
    }
  }

  render() {
    if (Platform.OS == 'ios' && this.props.provider == 'apple') {
      if (parseInt(Platform.Version) < 13 && this.state.geojsons.length > 0) {
        console.warn(
          "Versions of iOS < 13 doesn't support GeoJSON features for Apple Maps. Adding of GeoJSON for these versions will be omitted."
        );
      }
      if (parseInt(Platform.Version) < 13) {
        console.warn(
          "Versions of iOS < 13 doesn't support Points Of Interest Filters for Apple Maps. Adding POI filters for these versions will be omitted."
        );
      }
      if (parseInt(Platform.Version) < 14) {
        console.warn(
          "Versions of iOS < 14 doesn't support Local Points Of Interest fetching for Apple Maps. Using POI Display with these versions will be omitted."
        );
      }
      return (
        <NativeExpoAppleMapsView
          {...defaultNativeExpoMapViewProps}
          {...this.props}
          markers={this.state.markers}
          polygons={this.state.polygons}
          polylines={this.state.polylines}
          circles={this.state.circles}
          clusters={this.state.clusters}
          kmls={this.state.kmls}
          geojsons={this.state.geojsons}
          ref={this.mapView}
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
        geojsons={this.state.geojsons}
        ref={this.mapView}
      />
    );
  }
}

function buildGeoJsonObject(child: GeoJson): GeoJsonObject {
  if (
    child.props.defaultStyle?.marker?.color != undefined &&
    !Utils.isHexColor(child.props.defaultStyle.marker.color)
  ) {
    child.props.defaultStyle.marker.color = Utils.mapColorToHexColor(
      child.props.defaultStyle?.marker.color as Color,
      '#ff0000'
    );
  }

  if (
    child.props.defaultStyle?.polygon?.fillColor != undefined &&
    !Utils.isHexColor(child.props.defaultStyle.polygon.fillColor)
  ) {
    child.props.defaultStyle.polygon.fillColor = Utils.mapColorToHexColor(
      child.props.defaultStyle.polygon.fillColor as Color
    );
  }

  if (
    child.props.defaultStyle?.polygon?.strokeColor != undefined &&
    !Utils.isHexColor(child.props.defaultStyle.polygon.strokeColor)
  ) {
    child.props.defaultStyle.polygon.strokeColor = Utils.mapColorToHexColor(
      child.props.defaultStyle.polygon.strokeColor as Color
    );
  }

  if (
    child.props.defaultStyle?.polyline?.color != undefined &&
    !Utils.isHexColor(child.props.defaultStyle.polyline.color)
  ) {
    child.props.defaultStyle.polyline.color = Utils.mapColorToHexColor(
      child.props.defaultStyle.polyline.color as Color
    );
  }

  return {
    type: 'geojson',
    geoJsonString: child.props.geoJsonString,
    defaultStyle: child.props.defaultStyle,
  } as GeoJsonObject;
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
    color: child.props.color,
    draggable: child.props.draggable ? child.props.draggable : false,
    anchorU: child.props.anchorU,
    anchorV: child.props.anchorV,
    opacity: child.props.opacity ? child.props.opacity : 1,
  } as MarkerObject;

  if (
    markerObject.color != undefined &&
    !Utils.isHexColor(markerObject.color)
  ) {
    markerObject.color = Utils.mapColorToHexColor(
      markerObject.color as Color,
      '#ff0000'
    );
  }
  return markerObject;
}
