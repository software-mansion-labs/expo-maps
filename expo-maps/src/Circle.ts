import React from "react";
import { Point } from "./Common.types";

export type CircleProps = {
  center: Point;
  radius: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
};

export type CircleObject = {
  type: "circle";
  center: Point;
  radius: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
};

export class Circle extends React.Component<CircleProps> {
  render() {
    return null;
  }
}
