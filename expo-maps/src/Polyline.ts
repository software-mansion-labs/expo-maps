import React from 'react';
import { Point, PatternItem } from './Common.types';
import { PolygonProps } from './Polygon';

export type PolylineObject = {
  type: 'polyline';
  points: Point[];
};

export type PolylineProps = {
  /**
   * Vertices of the polyline in order.
   * @required
   */
  points: Point[];
  /**
   * Polyline stroke color in hex format. Example values:
   * `'#7F0000'`
   * `'#00990045'`
   * `'#ABC'`
   * `'#EEEF'`
   * @default '#000'
   */
  color?: string;
  /**
   * Polyline stroke width in pixels.
   */
  width?: number;
  /**
   * Pattern of dashes and gaps to draw the line.
   * Unprovided will imply a solid line.
   * Empty array will imply no visible line.
   * Otherwise line pattern starts with first provided element and repeats.
   */
  pattern?: PatternItem[];
  /**
   * Joint style of the polyline.
   */
  jointType?: 'bevel' | 'default' | 'round';
  capType?: 'butt' | 'round' | 'square';
};

/**
 * Represents a polyline on the map.
 */
export class Polyline extends React.Component<PolylineProps> {
  render() {
    return null;
  }
}
