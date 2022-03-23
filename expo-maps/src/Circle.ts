import React from 'react';
import { Point } from './Common.types';

export type CircleProps = {
  /**
   * The center position of the circle.
   * @required
   */
  center: Point;
  /**
   * The radius of the circle in meters.
   * @required
   */
  radius: number;
  /**
  /**
   * Color of the circle's edge line (optional).
   * 
   * Accepted formats:
   * * `'#RRGGBB'`
   * * `'#RRGGBBAA'`
   * * `'#RGB'`
   * * `'#RGBA'`
   * @default default for given map provider
   */
  strokeColor?: string;
  /**
   * Circle edge's width in pixels. (optional)
   * 
   * @default default for given map provider
   */
  strokeWidth?: number;
  /**
   * Circle fill color in hex format. Example values:
   * * '#7F0000'
   * * '#00990045'
   * * '#ABC'
   * * '#EEEF'
   * @default '#00000000'
   */
  fillColor?: string;
};


/**
 * Internal JSON object for representing circles in Expo Maps library.
 *
 * See {@link CircleProps} for more detail.
 */
export type CircleObject = {
  type: 'circle';
  center: Point;
  radius: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
};

/**
 * Circle component of Expo Maps library.
 *
 * Draws customizable flat circle on ExpoMap.
 * Drawn circle does not follow curvature of the Earth.
 *
 * This component should be ExpoMap component child to work properly.
 *
 * See {@link CircleProps} to learn more about props.
 */
export class Circle extends React.Component<CircleProps> {
  render() {
    return null;
  }
}
