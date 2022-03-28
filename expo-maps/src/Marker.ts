import React from 'react';
import { Point } from './Common.types';

export type MarkerColor =
  | 'azure'
  | 'blue'
  | 'cyan'
  | 'green'
  | 'magenta'
  | 'orange'
  | 'red'
  | 'rose'
  | 'violet'
  | 'yellow';


/**
 * Marker specific props.
 */
  export type MarkerOptions = {
  /**
   * Title of the marker, avaliable in annotation box.
   */
  title?: string;
  /**
   * Short description of the marker, avaliable in annotation box.
   */
  snippet?: string;
  /**
   * Custom marker icon.
   */
  icon?: string;
  /**
   * Color of a marker when icon is not provided.
   *
   * @default 'red'
   */
  defaultMarkerColor: number | MarkerColor;
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
  /**
   * Opacity of a marker's icon, applied both to asset based icon
   * as well as to default marker's icon.
   */
  opacity?: number;
};

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
