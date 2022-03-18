import React from 'react';
import { Color, Point } from './Common.types';
export declare type BaseMarkerOptions = {
    markerTitle?: string;
    markerSnippet?: string;
    icon?: string;
    color?: number | Color;
    opacity?: number;
};
export declare type MarkerOptions = {
    draggable?: boolean;
    anchorU?: number;
    anchorV?: number;
} & BaseMarkerOptions;
export declare type MarkerProps = MarkerOptions & Point;
export declare type MarkerObject = {
    type: 'marker';
} & MarkerOptions & Point;
export declare class Marker extends React.Component<MarkerProps> {
    render(): null;
}
