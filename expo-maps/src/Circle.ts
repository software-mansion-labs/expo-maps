import React from 'react';
import { Point } from './Common.types';

/**
 * Props of Circle component of Expo Maps library.
 *
 * @field center - coordinates of center points of the circle
 * @field radius - circle radius
 *
 * @field strokeColor - color of circle edge line (optional)
 * @default default for given map provider
 *
 * @field strokeWidth - width of circle edge line (optional)
 * @default default for given map provider
 *
 * @field fillColor - color to fill inside of the circle with (optional)
 * @default transparent
 */
export type CircleProps = {
  center: Point;
  radius: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
};

/**
 * Internal JSON object for representing circles in Expo Maps library.
 *
 * See `CircleProps` for more detail.
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
 * Draws customizable circle on ExpoMap.
 * This component should be ExpoMap component child to work properly.
 *
 * See `CircleProps` to learn more about props.
 */
export class Circle extends React.Component<CircleProps> {
  render() {
    return null;
  }
}
