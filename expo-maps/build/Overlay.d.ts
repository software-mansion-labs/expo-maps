import React from 'react';
import { Point } from './Common.types';
export declare type OverlayProps = {
    bounds: {
        southWest: Point;
        northEast: Point;
    };
    icon: string;
};
export declare type OverlayObject = {
    type: 'overlay';
} & OverlayProps;
export declare class Overlay extends React.Component<OverlayProps> {
    render(): null;
}
