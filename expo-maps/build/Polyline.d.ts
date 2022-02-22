import React from 'react';
import { Point } from './Common.types';
import { PolygonProps } from './Polygon';
export declare type PolylineObject = {
    type: 'polyline';
    points: Point[];
};
export declare type PolylineProps = PolygonProps;
export declare class Polyline extends React.Component<PolylineProps> {
    render(): null;
}
