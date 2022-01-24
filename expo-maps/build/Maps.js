import React from 'react';
import { NativeExpoAppleMapsView, NativeExpoGoogleMapsView, } from './NativeExpoMapView';
import { Platform } from 'react-native';
export * from './Maps.types';
const defaultNativeExpoMapViewProps = {
    mapType: 'normal',
};
export class ExpoMap extends React.Component {
    mapChildren() {
        const childrenArray = React.Children.map(this.props.children, (child) => {
            if (!isSimpleType(child)) {
                if (instanceOfMarker(child)) {
                    return {
                        type: 'marker',
                        latitude: child.props.latitude,
                        longitude: child.props.longitude,
                    };
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
            return (React.createElement(NativeExpoAppleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, markers: childrenObj.markers }));
        }
        return (React.createElement(NativeExpoGoogleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, jsonStyleString: this.props.googleMapsJsonStyleString
                ? this.props.googleMapsJsonStyleString
                : '', markers: childrenObj.markers }));
    }
}
export class Marker extends React.Component {
    render() {
        return null;
    }
}
function instanceOfMarker(child) {
    if ('type' in child &&
        String(child.type).includes('Marker') &&
        'props' in child) {
        return arePropsKeysEqual(Object.keys(child.props), [
            'latitude',
            'longitude',
        ]);
    }
    return false;
}
function warnIfChildIsIncompatible(child) {
    if (typeof child == 'string' ||
        typeof child == 'boolean' ||
        typeof child == 'number') {
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
function arePropsKeysEqual(expectedPropsKeys, actualPropsKeys) {
    return (actualPropsKeys.length === expectedPropsKeys.length &&
        actualPropsKeys.every((value, index) => value === expectedPropsKeys[index]));
}
//# sourceMappingURL=Maps.js.map