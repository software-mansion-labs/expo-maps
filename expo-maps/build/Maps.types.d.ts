import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
export declare type NativeExpoGoogleMapsViewProps = ViewProps & PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satelite' | 'terain';
}>;
export declare type NativeExpoAppleMapsViewProps = ViewProps & PropsWithChildren<{
    mapType: 'normal' | 'hybrid' | 'satelite' | 'terain';
}>;
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<{
    provider?: 'google' | 'apple';
    mapType?: 'normal' | 'hybrid' | 'satelite' | 'terain';
}>;
