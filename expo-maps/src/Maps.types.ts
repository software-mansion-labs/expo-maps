import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";

export interface SampleOptions {
  someOption: string;
}

export type NativeExpoMapViewProps = ViewProps &
  PropsWithChildren<{
    color: number;
  }>;

export type ExpoMapViewProps = ViewProps & PropsWithChildren<{ color: string }>;
