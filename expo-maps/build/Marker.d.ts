import React from 'react';
import { Point } from './Common.types';
export declare type MarkerColor = 'azure' | 'blue' | 'cyan' | 'green' | 'magenta' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
export declare type MarkerOptions = {
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor: number | MarkerColor;
    draggable?: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity?: number;
};
/**
 * Props of Marker component of Expo Maps library.
 *
 * @field latitude - latitude coordinate of the marker
 * @field longitude - longitude coordinate of the marker
 *
 * @field title - title of the marker, avaliable in annotation box (optional)
 * @default undefined, not present
 *
 * @field snippet - short description of the marker, avaliable in annotation box (optional)
 * @default undefined, not present
 *
 * @field icon - custom marker icon (optional)
 * @default default marker icon for given provider
 *
 * @field defaultMarkerColor - TODO
 * @default 0
 *
 * @field draggable - `true` if marker should be draggable, otherwise `false` (optional)
 * @default false
 *
 * @field anchorU - TODO
 * @field anchorV - TODO
 * @field opacity - TODO
 */
export declare type MarkerProps = MarkerOptions & Point;
/**
 * Internal JSON object for representing markers in Expo Maps library.
 *
 * See `MarkerProps` for more detail.
 */
export declare type MarkerObject = {
    type: 'marker';
} & MarkerOptions & Point;
/**
 * Marker component of Expo Maps library.
 *
 * Draws customizable marker on ExpoMap.
 * This component should be ExpoMap component child to work properly.
 *
 * See `MarkerProps` to learn more about props.
 */
export declare class Marker extends React.Component<MarkerProps> {
    render(): null;
}
