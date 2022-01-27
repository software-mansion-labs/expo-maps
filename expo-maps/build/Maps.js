import React from 'react';
import { NativeExpoAppleMapsView, NativeExpoGoogleMapsView } from './NativeExpoMapView';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';
export * from './Maps.types';
const defaultNativeExpoMapViewProps = {
    mapType: 'normal',
    enableRotateGestures: false,
    enableScrollGestures: true,
    enableTiltGestures: false,
    enableZoomGestures: true,
};
export class ExpoMap extends React.Component {
    state = {
        markers: [],
        polygons: [],
        polylines: [],
    };
    componentDidMount() {
        this.mapChildren();
    }
    async mapChildren() {
        const childrenArray = React.Children.map(this.props.children, async (child) => {
            if (!isSimpleType(child)) {
                if (instanceOfMarker(child)) {
                    let iconPath = undefined;
                    if (child.props.icon !== undefined) {
                        iconPath = await Asset.fromModule(child.props.icon).downloadAsync();
                    }
                    return {
                        type: 'marker',
                        latitude: child.props.latitude,
                        longitude: child.props.longitude,
                        title: child.props.title,
                        snippet: child.props.snippet,
                        icon: iconPath?.localUri,
                        defaultMarkerColor: child.props.defaultMarkerColor ? child.props.defaultMarkerColor : 'red',
                        draggable: child.props.draggable ? child.props.draggable : false,
                        anchorU: child.props.anchorU,
                        anchorV: child.props.anchorV,
                        opacity: child.props.opacity,
                        zIndex: child.props.zIndex,
                    };
                }
                else if (instanceOfPolygon(child)) {
                    return {
                        type: 'polygon',
                        points: child.props.points,
                    };
                }
                else if (instanceOfPolyline(child)) {
                    return {
                        type: 'polyline',
                        points: child.props.points,
                    };
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
            return (React.createElement(NativeExpoAppleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, markers: this.state.markers, polygons: this.state.polygons, polylines: this.state.polylines }));
        }
        return (React.createElement(NativeExpoGoogleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, jsonStyleString: this.props.googleMapsJsonStyleString ? this.props.googleMapsJsonStyleString : '', markers: this.state.markers, polygons: this.state.polygons, polylines: this.state.polylines }));
    }
}
export class Marker extends React.Component {
    render() {
        return null;
    }
}
function instanceOfMarker(child) {
    if ('type' in child && String(child.type).includes('Marker') && 'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('latitude') && props.includes('longitude')) {
            return true;
        }
    }
    return false;
}
export class Polygon extends React.Component {
    render() {
        return null;
    }
}
function instanceOfPolygon(child) {
    if ('type' in child && String(child.type).includes('Polygon') && 'props' in child) {
        return true;
    }
    return false;
}
export class Polyline extends React.Component {
    render() {
        return null;
    }
}
function instanceOfPolyline(child) {
    if ('type' in child && String(child.type).includes('Polyline') && 'props' in child) {
        return true;
    }
    return false;
}
function warnIfChildIsIncompatible(child) {
    if (typeof child == 'string' || typeof child == 'boolean' || typeof child == 'number') {
        console.warn(`Warning! Child of type ${typeof child} isn't valid ExpoMap child!`);
    }
    else if (child != null && child != undefined) {
        console.log(child.type);
        console.warn(`Warning! Child of type ${child.type} isn't valid ExpoMap child!`);
    }
}
function isSimpleType(child) {
    return (typeof child == 'string' ||
        typeof child == 'boolean' ||
        typeof child == 'number' ||
        child == null ||
        child == undefined);
}
//# sourceMappingURL=Maps.js.map