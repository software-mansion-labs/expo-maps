import { ViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
export declare type NativeExpoGoogleMapsViewProps = ViewProps;
export declare type NativeExpoAppleMapsViewProps = ViewProps;
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<{
    provider?: 'google' | 'apple';
}>;
