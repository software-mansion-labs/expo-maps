import React from 'react';
import { Point } from './Common.types';
export declare type MarkerColor = 'azure' | 'blue' | 'cyan' | 'green' | 'magenta' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
export declare type MarkerOptions = {
    title?: string;
    snippet?: string;
    icon?: string;
    defaultMarkerColor: number | MarkerColor;
    draggable: boolean;
    anchorU?: number;
    anchorV?: number;
    opacity?: number;
};
export declare type MarkerProps = MarkerOptions & Point;
export declare type MarkerObject = {
    type: 'marker';
} & MarkerOptions & Point;
export declare class Marker extends React.Component<MarkerProps> {
    render(): null;
}
