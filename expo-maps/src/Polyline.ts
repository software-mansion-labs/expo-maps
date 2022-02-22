import React from 'react';
import { Point } from './Common.types';
import { PolygonProps } from './Polygon';

export type PolylineObject = {
  type: 'polyline';
  points: Point[];
};

export type PolylineProps = PolygonProps;

export class Polyline extends React.Component<PolylineProps> {
  render() {
    return null;
  }
}
