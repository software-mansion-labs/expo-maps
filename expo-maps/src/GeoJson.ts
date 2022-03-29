import React from 'react';

/**
 * GeoJson specific props.
 */
export type GeoJsonProps = {
  /**
   * JSON string containing GeoJSON
   */
  geoJsonString: string;
};

/**
 * Internal JSON object for representing GeoJSON in Expo Maps library.
 *
 * See {@link GeoJsonProps} for more detail.
 */
export type GeoJsonObject = {
  type: 'geojson';
} & GeoJsonProps;

/**
 * GeoJSON component of Expo Maps library.
 *
 * Displays data provided in .json file.
 * This component should be ExpoMap component child to work properly.
 *
 * See {@link GeoJsonProps} for more details.
 */
export class GeoJson extends React.Component<GeoJsonProps> {
  render() {
    return null;
  }
}
