import React from 'react';
import { NativeExpoAppleMapsView, NativeExpoGoogleMapsView, } from './NativeExpoMapView';
import { Platform } from 'react-native';
export * from './Maps.types';
const defaultNativeExpoMapViewProps = {
    mapType: 'normal',
};
export class ExpoMap extends React.Component {
    render() {
        let NativeExpoMapView = NativeExpoGoogleMapsView;
        if (Platform.OS == 'ios' && this.props.provider == 'apple') {
            NativeExpoMapView = NativeExpoAppleMapsView;
        }
        return (React.createElement(NativeExpoMapView, { ...defaultNativeExpoMapViewProps, ...this.props }));
    }
}
//# sourceMappingURL=Maps.js.map