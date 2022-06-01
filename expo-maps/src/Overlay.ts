import React from 'react';
import { Point } from './Common.types';

export type OverlayProps = {
  bounds: {
    southWest: Point;
    northEast: Point;
  };
  icon: string;
};

export type OverlayObject = {
  type: 'overlay';
} & OverlayProps;

export class Overlay extends React.Component<OverlayProps> {
  render() {
    return null;
  }
}
