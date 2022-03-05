import React from "react";
import { Point } from "./Common.types";
export declare type CircleProps = {
    center: Point;
    radius: number;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
};
export declare type CircleObject = {
    type: "circle";
    center: Point;
    radius: number;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
};
export declare class Circle extends React.Component<CircleProps> {
    render(): null;
}
