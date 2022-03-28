import React from 'react';
import { PropsWithChildren } from 'react';
import { BaseMarkerOptions, MarkerObject } from './Marker';
export declare type ClusterProps = PropsWithChildren<{
    name: String;
    minimumClusterSize?: number;
} & BaseMarkerOptions>;
export declare type ClusterObject = {
    type: 'cluster';
    markers: MarkerObject[];
    name: String;
    minimumClusterSize: number;
} & BaseMarkerOptions;
export declare class Cluster extends React.Component<ClusterProps> {
    render(): null;
}
