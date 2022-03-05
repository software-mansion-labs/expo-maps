import React from 'react';
import { Point, PatternItem } from './Common.types';
export declare type PolygonProps = {
    points: Point[];
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    strokePattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
};
export declare type PolygonObject = {
    type: 'polygon';
    points: Point[];
};
export declare class Polygon extends React.Component<PolygonProps> {
    render(): null;
}
