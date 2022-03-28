import React from 'react';
import { PropsWithChildren } from 'react';
import { BaseMarkerOptions, MarkerObject } from './Marker';

export type ClusterProps = PropsWithChildren<
  {
    name: String;
    minimumClusterSize?: number;
  } & BaseMarkerOptions
>;

export type ClusterObject = {
  type: 'cluster';
  markers: MarkerObject[];
  name: String;
  minimumClusterSize: number;
} & BaseMarkerOptions;

export class Cluster extends React.Component<ClusterProps> {
  render() {
    return null;
  }
}
