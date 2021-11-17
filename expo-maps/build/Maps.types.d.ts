import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";
export interface SampleOptions {
    someOption: string;
}
export declare type NativeExpoMapViewProps = ViewProps & PropsWithChildren<{
    color: number;
}>;
export declare type ExpoMapViewProps = ViewProps & PropsWithChildren<{
    color: string;
}>;
