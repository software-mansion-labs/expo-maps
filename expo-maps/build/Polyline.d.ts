import React from 'react';
import { Point, PatternItem } from './Common.types';
export declare type PolylineObject = {
    type: 'polyline';
    points: Point[];
};
export declare type PolylineProps = {
    points: Point[];
    color?: string;
    width?: number;
    pattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
    capType?: 'butt' | 'round' | 'square';
};
export declare class Polyline extends React.Component<PolylineProps> {
    render(): null;
}
