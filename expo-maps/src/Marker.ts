import React from 'react';
import { Color, Point } from './Common.types';

/**
 * Marker specific props.
 */
export type BaseMarkerOptions = {
  /**
   * Title of the marker, avaliable in annotation box.
   */
  markerTitle?: string;
  /**
   * Short description of the marker, avaliable in annotation box.
   */
  markerSnippet?: string;
  /**
   * Custom marker icon.
   */
  icon?: string;
  /**
   * Color of a marker when icon is not provided.
   *
   * @default 'red'
   */
  color?: number | Color;
  /**
   * Opacity of a marker's icon, applied both to asset based icon
   * as well as to default marker's icon.
   */
  opacity?: number;
};

export type MarkerOptions = {
  /**
   * If 'true` marker is draggable.
   *
   * @default false
   */
  draggable?: boolean;
  /**
   * Translation of latitude coordinate.
   */
  anchorU?: number;
  /**
   * Translation of longitude coordinate.
   */
  anchorV?: number;
} & BaseMarkerOptions;

/**
 * Props of Marker component of Expo Maps library.
 */
export type MarkerProps = MarkerOptions & Point;

/**
 * Internal JSON object for representing markers in Expo Maps library.
 *
 * See {@link MarkerProps} for more details.
 */
export type MarkerObject = {
  type: 'marker';
} & MarkerOptions &
  Point;

/**
 * Marker component of Expo Maps library.
 *
 * Draws customizable marker on ExpoMap.
 * This component should be ExpoMap component child to work properly.
 *
 * See {@link MarkerProps} for more details.
 */
export class Marker extends React.Component<MarkerProps> {
  render() {
    return null;
  }
}
