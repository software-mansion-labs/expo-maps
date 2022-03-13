import React from 'react';
import { NativeExpoAppleMapsView, NativeExpoGoogleMapsView } from './NativeExpoMapView';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';
import * as Utils from './Utils';
export { Marker } from './Marker';
export { Polygon } from './Polygon';
export { Polyline } from './Polyline';
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
    cameraPosition: {
        latitude: 51.51,
        longitude: 0.13,
        zoom: 4,
        animate: true,
    },
};
export class ExpoMap extends React.Component {
    state = {
        markers: [],
        polygons: [],
        polylines: [],
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
                    let iconPath = undefined;
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
                    };
                    if (child.props.defaultMarkerColor != undefined) {
                        if (typeof child.props.defaultMarkerColor === 'number') {
                            markerObject.defaultMarkerColor = child.props.defaultMarkerColor;
                        }
                        else {
                            markerObject.defaultMarkerColor = mapColor(child.props.defaultMarkerColor);
                        }
                    }
                    return markerObject;
                }
                else if (Utils.isPolygon(child)) {
                    return {
                        type: 'polygon',
                        points: child.props.points,
                    };
                }
                else if (Utils.isPolyline(child)) {
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
            if (this._ismounted) {
                this.setState({
                    markers: propObjects.filter((elem) => elem?.type === 'marker'),
                    polygons: propObjects.filter((elem) => elem?.type === 'polygon'),
                    polylines: propObjects.filter((elem) => elem?.type === 'polyline'),
                });
            }
        }
    }
    render() {
        if (Platform.OS == 'ios' && this.props.provider == 'apple') {
            return (React.createElement(NativeExpoAppleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, markers: this.state.markers, polygons: this.state.polygons, polylines: this.state.polylines }));
        }
        return (React.createElement(NativeExpoGoogleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, googleMapsJsonStyleString: this.props.googleMapsJsonStyleString ? this.props.googleMapsJsonStyleString : '', markers: this.state.markers, polygons: this.state.polygons, polylines: this.state.polylines }));
    }
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
function mapColor(color) {
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
        default: {
            return 0;
        }
    }
}
//# sourceMappingURL=Map.js.map