import React from "react";
import { Point, PatternItem } from "./Common.types";
import { PolygonProps } from "./Polygon";

export type PolylineObject = {
  type: "polyline";
  points: Point[];
};

export type PolylineProps = {
  points: Point[];
  color?: string;
  width?: number;
  pattern?: PatternItem[];
  jointType?: "bevel" | "default" | "round";
  capType?: "butt" | "round" | "square";
};

export class Polyline extends React.Component<PolylineProps> {
  render() {
    return null;
  }
}
