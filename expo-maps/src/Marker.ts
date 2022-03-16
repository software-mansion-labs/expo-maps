import React from 'react';
import { Color, Point } from './Common.types';

export type BaseMarkerOptions = {
  markerTitle?: string;
  markerSnippet?: string;
  icon?: string;
  color?: number | Color;
  opacity?: number;
};

export type MarkerOptions = {
  draggable?: boolean;
  anchorU?: number;
  anchorV?: number;
} & BaseMarkerOptions;

export type MarkerProps = MarkerOptions & Point;

export type MarkerObject = {
  type: 'marker';
} & MarkerOptions &
  Point;

export class Marker extends React.Component<MarkerProps> {
  render() {
    return null;
  }
}
