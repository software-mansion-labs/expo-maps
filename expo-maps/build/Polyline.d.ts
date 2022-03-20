import React from 'react';
import { Point, PatternItem } from './Common.types';
/**
 * Internal JSON object for representing polylines in Expo Maps library.
 *
 * See `PolylineProps` for more detail.
 */
export declare type PolylineObject = {
    type: 'polyline';
    points: Point[];
};
/**
 * Props of Polline component of Expo Maps library.
 *
 * @field points - array of points through which the polyline runs
 *
 * @field color - color of polyline (optional)
 * @default default for given provider
 *
 * @field Width - width of polyline (optional)
 * @default default for given provider
 *
 * @field pattern - TODO
 * @default
 *
 * @field jointType - TODO
 * @default
 *
 * @field capType - TODO
 * @default
 */
export declare type PolylineProps = {
    points: Point[];
    color?: string;
    width?: number;
    pattern?: PatternItem[];
    jointType?: 'bevel' | 'default' | 'round';
    capType?: 'butt' | 'round' | 'square';
};
/**
 * Polyline component of Expo Maps library.
 *
 * Draws customizable polyline on ExpoMap.
 * This component should be ExpoMap component child to work properly.
 *
 * See `PolylineProps` to learn more about props.
 */
export declare class Polyline extends React.Component<PolylineProps> {
    render(): null;
}
