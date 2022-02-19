import React from 'react';
import { Point } from './Common.types';
export declare type PolygonProps = {
    points: Point[];
};
export declare type PolygonObject = {
    type: 'polygon';
    points: Point[];
};
export declare class Polygon extends React.Component<PolygonProps> {
    render(): null;
}
