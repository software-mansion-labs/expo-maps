import React from 'react';
import { Point } from './Common.types';
export declare type MarkerColor = 'azure' | 'blue' | 'cyan' | 'green' | 'magenta' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
export declare type MarkerProps = {
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor?: number | MarkerColor;
    draggable?: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity?: number;
} & Point;
export declare type MarkerObject = {
    type: 'marker';
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor: number;
    draggable: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity: number;
} & Point;
export declare class Marker extends React.Component<MarkerProps> {
    render(): null;
}
