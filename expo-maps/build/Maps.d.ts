import React from "react";
import { SampleOptions, ExpoMapViewProps } from "./Maps.types";
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
export declare function someGreatMethodAsync(options: SampleOptions): Promise<any>;
export declare class ExpoMap extends React.Component<ExpoMapViewProps> {
    render(): JSX.Element;
}
