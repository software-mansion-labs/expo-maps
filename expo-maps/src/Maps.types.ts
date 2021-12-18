import { PropsWithChildren } from 'react';
import { ViewProps } from 'react-native';

export type NativeExpoMapViewProps = ViewProps &
  PropsWithChildren<{
    apiKey: string;
  }>;

export type ExpoMapViewProps = ViewProps &
  PropsWithChildren<{ apiKey: string }>;
