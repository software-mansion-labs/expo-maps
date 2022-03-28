import React from 'react';
import { PropsWithChildren } from 'react';
import { BaseMarkerOptions, MarkerObject, Marker } from './Marker';

/**
 * Props of Cluster component of Expo Maps library.
 */
export type ClusterProps = PropsWithChildren<
  {
    /**
     * Cluster name
     *
     * @required
     */
    name: String;
     /**
     * Minimal number of markers to form the cluster
     *
     * @default 4
     */
    minimumClusterSize?: number;
  } & BaseMarkerOptions
>;

/**
 * Internal JSON object for representing marker clusters in Expo Maps library.
 *
 * See {@link ClusterProps} for more detail.
 */
export type ClusterObject = {
  type: 'cluster';
  markers: MarkerObject[];
  name: String;
  minimumClusterSize: number;
} & BaseMarkerOptions;

/**
 * Cluster component of Expo Maps library.
 *
 * Gathers {@link Marker}s passed as this component children in cluster.
 *
 * This component should be ExpoMap component child to work properly.
 *
 * See {@link ClusterProps} to learn more about props.
 */
export class Cluster extends React.Component<ClusterProps> {
  render() {
    return null;
  }
}
