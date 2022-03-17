import React from 'react';
import { Point } from './Common.types';
export declare type CircleProps = {
    /**
     * The center position of the circle.
     * @required
     */
    center: Point;
    /**
     * The radius of the circle in meters.
     * @required
     */
    radius: number;
    /**
     * Circle stroke color in hex format.
     * @example '#7F0000'
     * @example '#00990045'
     * @example '#ABC'
     * @example '#EEEF'
     */
    strokeColor?: string;
    /**
     * Circle stroke width in pixels.
     */
    strokeWidth?: number;
    /**
     * Circle fill color in hex format.
     * @example '#7F0000'
     * @example '#00990045'
     * @example '#ABC'
     * @example '#EEEF'
     */
    fillColor?: string;
};
export declare type CircleObject = {
    type: 'circle';
    center: Point;
    radius: number;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
};
/**
 * Represents a flat circle on the map.
 * Does not follow the curvature of the Earth.
 */
export declare class Circle extends React.Component<CircleProps> {
    render(): null;
}
