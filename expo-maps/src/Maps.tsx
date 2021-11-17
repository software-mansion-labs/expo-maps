import React from "react";
import ExpoMaps from "./ExpoMaps";
import { SampleOptions, ExpoMapViewProps } from "./Maps.types";
import NativeExpoMapView from "./NativeExpoMapView";
import { processColor } from "react-native";

export * from "./Maps.types";

/**
 * Great method that does a lot great stuff.
 * @param options specifies what great stuff you really want.
 *
 * @example
 * ```typescript
 * const result = await someGreatMethodAsync({ someOption: 'awesome' });
 * ```
 */
export async function someGreatMethodAsync(options: SampleOptions) {
  return await ExpoMaps.someGreatMethodAsync(options);
}

export class ExpoMap extends React.Component<ExpoMapViewProps> {
  render() {
    const { color } = this.props;
    return (
      <NativeExpoMapView
        {...this.props}
        color={processColor(color) as number}
      />
    );
  }
}
