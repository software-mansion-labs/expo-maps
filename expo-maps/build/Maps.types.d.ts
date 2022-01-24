import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    jsonStyleString: string;
    markers: MarkerObject[];
}>;
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    markers: MarkerObject[];
}>;
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<{
    provider?: 'google' | 'apple';
    mapType?: 'normal' | 'hybrid' | 'satellite' | 'terrain';
    googleMapsJsonStyleString?: string;
}>;
export declare type MarkerObject = {
    type: string;
    lat: number;
    lng: number;
};
export declare type ExpoMarkerProps = PropsWithChildren<{
    latitude: number;
    longitude: number;
}>;
