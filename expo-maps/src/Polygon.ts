import React from "react";
import { Point, PatternItem } from "./Common.types";

export type PolygonProps = {
  points: Point[];
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokePattern?: PatternItem[];
  jointType?: "bevel" | "default" | "round";
};

export type PolygonObject = {
  type: "polygon";
  points: Point[];
};

export class Polygon extends React.Component<PolygonProps> {
  render() {
    return null;
  }
}
