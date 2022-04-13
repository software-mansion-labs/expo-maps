import React from 'react';
import { NativeExpoAppleMapsView, NativeExpoGoogleMapsView, } from './NativeExpoMapView';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';
import * as Utils from './Utils';
export { Marker } from './Marker';
export { Polygon } from './Polygon';
export { Polyline } from './Polyline';
export { Circle } from './Circle';
export { Cluster } from './Cluster';
export { KML } from './KML';
export { GeoJson } from './GeoJson';
const defaultNativeExpoMapViewProps = {
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
};
/**
 * Main map component of Expo Maps library.
 *
 * See {@link ExpoMapViewProps} to learn more about props.
 */
export class ExpoMap extends React.Component {
    state = {
        markers: [],
        polygons: [],
        polylines: [],
        circles: [],
        clusters: [],
        kmls: [],
        geojsons: [],
    };
    _ismounted = false;
    componentDidMount() {
        this.mapChildren();
        this._ismounted = true;
    }
    componentWillUnmount() {
        this._ismounted = false;
    }
    componentDidUpdate(_, prevState) {
        if (Object.is(this.state, prevState)) {
            this.mapChildren();
        }
    }
    async mapChildren() {
        const childrenArray = React.Children.map(this.props.children, async (child) => {
            if (!Utils.isSimpleType(child)) {
                if (Utils.isMarker(child)) {
                    return buildMarkerObject(child);
                }
                else if (Utils.isPolygon(child)) {
                    const polygonObject = {
                        type: 'polygon',
                        points: child.props.points,
                        fillColor: child.props.fillColor,
                        strokeColor: child.props.strokeColor,
                        strokeWidth: child.props.strokeWidth,
                        strokePattern: child.props.strokePattern,
                        jointType: child.props.jointType,
                    };
                    if (polygonObject.fillColor != undefined &&
                        !Utils.isHexColor(polygonObject.fillColor)) {
                        polygonObject.fillColor = Utils.mapColorToHexColor(polygonObject.fillColor);
                    }
                    return polygonObject;
                }
                else if (Utils.isPolyline(child)) {
                    const polylineObject = {
                        type: 'polyline',
                        points: child.props.points,
                        color: child.props.color,
                        width: child.props.width,
                        pattern: child.props.pattern,
                        jointType: child.props.jointType,
                        capType: child.props.capType,
                    };
                    if (polylineObject.color != undefined &&
                        !Utils.isHexColor(polylineObject.color)) {
                        polylineObject.color = Utils.mapColorToHexColor(polylineObject.color);
                    }
                    return polylineObject;
                }
                else if (Utils.isCircle(child)) {
                    return {
                        type: 'circle',
                        center: child.props.center,
                        radius: child.props.radius,
                        fillColor: child.props.fillColor,
                        strokeColor: child.props.strokeColor,
                        strokeWidth: child.props.strokeWidth,
                    };
                }
                else if (Utils.isKML(child)) {
                    let filePath = await Asset.fromModule(child.props.filePath).downloadAsync();
                    return {
                        type: 'kml',
                        filePath: filePath.localUri,
                    };
                }
                else if (Utils.isGeoJson(child)) {
                    return buildGeoJsonObject(child);
                }
                else if (Utils.isCluster(child)) {
                    const clusterChildrenArray = React.Children.map(child.props.children, async (clusterChild) => {
                        if (!Utils.isSimpleType(clusterChild)) {
                            if (Utils.isMarker(clusterChild)) {
                                return buildMarkerObject(clusterChild);
                            }
                        }
                        Utils.warnIfChildIsIncompatible(clusterChild);
                        return null;
                    });
                    if (clusterChildrenArray != undefined) {
                        let iconPath = undefined;
                        if (child.props.icon !== undefined) {
                            iconPath = await Asset.fromModule(child.props.icon).downloadAsync();
                        }
                        let clusterPropObjects = await Promise.all(clusterChildrenArray);
                        var minimumClusterSize;
                        if (child.props.minimumClusterSize !== undefined &&
                            child.props.minimumClusterSize > 0) {
                            minimumClusterSize = child.props.minimumClusterSize;
                        }
                        else {
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
                        };
                        if (child.props.color != undefined) {
                            if (typeof child.props.color === 'number') {
                                clusterObject.color = child.props.color;
                            }
                            else {
                                clusterObject.color = Utils.mapColorToNativeMarkerColor(child.props.color);
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
        });
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
            return (React.createElement(NativeExpoAppleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, markers: this.state.markers, polygons: this.state.polygons, polylines: this.state.polylines, circles: this.state.circles, clusters: this.state.clusters, geojsons: this.state.geojsons }));
        }
        return (React.createElement(NativeExpoGoogleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, googleMapsJsonStyleString: this.props.googleMapsJsonStyleString
                ? this.props.googleMapsJsonStyleString
                : '', markers: this.state.markers, polygons: this.state.polygons, polylines: this.state.polylines, circles: this.state.circles, clusters: this.state.clusters, kmls: this.state.kmls, geojsons: this.state.geojsons }));
    }
}
function buildGeoJsonObject(child) {
    if (child.props.defaultStyle?.marker?.color != undefined) {
        if (typeof child.props.defaultStyle?.marker.color !== 'number') {
            child.props.defaultStyle.marker.color = Utils.mapColorToNativeMarkerColor(child.props.defaultStyle.marker.color);
        }
    }
    if (child.props.defaultStyle?.polygon?.fillColor != undefined &&
        !Utils.isHexColor(child.props.defaultStyle.polygon.fillColor)) {
        child.props.defaultStyle.polygon.fillColor = Utils.mapColorToHexColor(child.props.defaultStyle.polygon.fillColor);
    }
    if (child.props.defaultStyle?.polygon?.strokeColor != undefined &&
        !Utils.isHexColor(child.props.defaultStyle.polygon.strokeColor)) {
        child.props.defaultStyle.polygon.strokeColor = Utils.mapColorToHexColor(child.props.defaultStyle.polygon.strokeColor);
    }
    if (child.props.defaultStyle?.polyline?.color != undefined &&
        !Utils.isHexColor(child.props.defaultStyle.polyline.color)) {
        child.props.defaultStyle.polyline.color = Utils.mapColorToHexColor(child.props.defaultStyle.polyline.color);
    }
    return {
        type: 'geojson',
        geoJsonString: child.props.geoJsonString,
        defaultStyle: child.props.defaultStyle,
    };
}
async function buildMarkerObject(child) {
    let iconPath = undefined;
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
    };
    if (child.props.color != undefined) {
        if (typeof child.props.color === 'number') {
            markerObject.color = child.props.color;
        }
        else {
            markerObject.color = Utils.mapColorToNativeMarkerColor(child.props.color);
        }
    }
    return markerObject;
}
//# sourceMappingURL=Map.js.map