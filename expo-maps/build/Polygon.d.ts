import React from 'react';
import { Point, PatternItem } from './Common.types';
/**
 * Props of Polygon component of Expo Maps library.
 *
 * @field points - array of points through which the polygon runs
 *
 * @field fillColor - color filling interior of the polygon (optional)
 * @default transparent
 *
 * @field strokeColor - color of polygon edge line (optional)
 * @default default for given provider
 *
 * @field strokeWidth - width of polygon edge line (optional)
 * @default default for given provider
 *
 * @field strokePattern - TODO
 * @default
 *
 * @field jointType - TODO
 * @default
 */
export declare type PolygonProps = {
    points: Point[];
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    strokePattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
};
/**
 * Internal JSON object for representing polygons in Expo Maps library.
 *
 * See `PolygonProps` for more detail.
 */
export declare type PolygonObject = {
    type: 'polygon';
    points: Point[];
};
/**
 * Polygon component of Expo Maps library.
 *
 * Draws customizable polygon on ExpoMap.
 * This component should be ExpoMap component child to work properly.
 *
 * See `PolygonProps` to learn more about props.
 */
export declare class Polygon extends React.Component<PolygonProps> {
    render(): null;
}
