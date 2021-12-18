import React from 'react';
import { ExpoMapViewProps } from './Maps.types';
import NativeExpoMapView from './NativeExpoMapView';

export * from './Maps.types';

/**
 * Great method that does a lot great stuff.
 * @param options specifies what great stuff you really want.
 *
 * @example
 * ```typescript
 * const result = await someGreatMethodAsync({ someOption: 'awesome' });
 * ```
 */

export class ExpoMap extends React.Component<ExpoMapViewProps> {
  render() {
    const { apiKey } = this.props;
    return <NativeExpoMapView {...this.props} apiKey={apiKey} />;
  }
}
