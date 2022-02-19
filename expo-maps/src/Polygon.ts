import React from 'react';
import { Point } from './Common.types';

export type PolygonProps = {
  points: Point[];
};

export type PolygonObject = {
  type: 'polygon';
  points: Point[];
};

export class Polygon extends React.Component<PolygonProps> {
  render() {
    return null;
  }
}
