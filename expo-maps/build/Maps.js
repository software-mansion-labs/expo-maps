import React from 'react';
import NativeExpoMapView from './NativeExpoMapView';
export * from './Maps.types';
export class ExpoMap extends React.Component {
    render() {
        return React.createElement(NativeExpoMapView, { ...this.props });
    }
}
//# sourceMappingURL=Maps.js.map