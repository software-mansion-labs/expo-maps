import React from 'react';
import { NativeExpoAppleMapsView, NativeExpoGoogleMapsView, } from './NativeExpoMapView';
import { Platform } from 'react-native';
export * from './Maps.types';
const defaultNativeExpoMapViewProps = {
    mapType: 'normal',
};
export class ExpoMap extends React.Component {
    render() {
        if (Platform.OS == 'ios' && this.props.provider == 'apple') {
            return (React.createElement(NativeExpoAppleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props }));
        }
        return (React.createElement(NativeExpoGoogleMapsView, { ...defaultNativeExpoMapViewProps, ...this.props, jsonStyleString: this.props.googleMapsJsonStyleString
                ? this.props.googleMapsJsonStyleString
                : '' }));
    }
}
//# sourceMappingURL=Maps.js.map