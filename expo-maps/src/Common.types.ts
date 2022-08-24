/**
 * Basic point type for representing a coordinate on a map.
 */
export type Point = {
  /**
   * The latitude of the point in degrees. Use decimal degrees as opposed to degrees/minutes/seconds.
   * @required
   */
  latitude: number;
  /**
   * The longitude of the point in degrees. Use decimal degrees as opposed to degrees/minutes/seconds.
   * @required
   */
  longitude: number;
};

/**
 * Generic object that associates numerical data with a georgaphic coordinate.
 */
export type PointWithData = Point & {
  /**
   * Numerical data associated with the point. (optional)
   * @default 1
   */
  data?: number;
};

/**
 * PatternItem is used to define a repeating pattern for polyline and polygon line.
 * PatternItem with type `stroke` and length 0 will represent a dot.
 * Use an array of PatternItem to define a pattern.
 */
export type PatternItem = {
  /**
   * The type of the pattern item.
   * * `'stroke'` - rendered line segment
   * * `'gap'` - transparent gap between pattern items
   * @required
   */
  type: 'stroke' | 'gap';
  /**
   * Length of the pattern item in pixels.
   * @required
   */
  length: number;
};

export type CameraPosition = {
  /**
   * The location that the camera is pointing at.
   * @required
   */
  target: Point;

  /**
   * The Direction that the camera is pointing in, in degrees clockwise from north
   * @required
   */
  bearing: number;

  /**
   * The angle, in degrees, of the camera angle from the nadir (directly facing the Earth).
   * @required
   */

  tilt: number;

  /**
   * Zoom level near the center of the screen.
   * @platform iOS: Google maps only.
   * @platform Android: Supported
   */
  zoom: number;

  /**
   * The amount of north-to-south distance (measured in degrees) to display on the map.
   * @required Google Maps only
   */
  latitudeDelta: number;

  /**
   * The amount of east-to-west distance (measured in degrees) to display for the map region.
   * @required
   */
  longitudeDelta: number;
};

/**
 * Type describing points of interest on the map
 */
export type PointOfInterest = {
  /**
   * Position of the point of interest
   * @required
   */
  position: Point;
  /**
   * Name of the point of interest
   * @required
   */
  name: string;
  /**
   * Unique ID of the point of interest
   * @required
   */
  placeId: string;
};

/**
 * Type describing a marker (pin) placed on the map
 */
export type Marker = {
  /**
   * Id given to the marker
   */
  id: string;
  /**
   * Position of the marker
   * @required
   */
  position: Point;
};

export type MapCluster = {
  /**
   * ID of the cluster
   */
  id: String;
  /**
   * Position of the point of the cluster
   * @required
   */
  position: Point;
};

export type UserLocation = {
  /**
   * Current position of the user represented by
   * {@link Point}
   */
  position: Point;
  /**
   * Current altitude of the user
   */
  altitude: Number;
  /**
   * The radius of uncertainty for the user'slocation, measured in meters.
   */
  accuracy: Number;
  /**
   * Accuracy of current altitude estimate
   */
  verticalAccuracy: Number;
  /**
   * Current speed of the user measured im meters per second
   */
  speed: Number;
  /**
   * Accuracy of the current speed estimate
   */
  speedAccuracy: Number;
  /**
   * Direction the user is heading
   */
  heading: Number;
  /**
   * The time at which this location was determined
   */
  timestamp: Number;
};

export type Color =
  | 'red'
  | 'blue'
  | 'green'
  | 'black'
  | 'white'
  | 'gray'
  | 'cyan'
  | 'magenta'
  | 'yellow'
  | 'lightgray'
  | 'darkgray'
  | 'aqua'
  | 'fuchsia'
  | 'lime'
  | 'maroon'
  | 'navy'
  | 'olive'
  | 'purple'
  | 'silver'
  | 'teal';

/**
 * Possible power priorities for OnLocationChange event
 */
export enum LocationChangePriority {
  /**
   * Best accuracy that the device can acquire. Will consume more power.
   */
  PRIORITY_HIGH_ACCURACY = 100,
  /**
   * Bock level accuracy. Block level accuracy is considered to be about 100 meter accuracy.
   */
  PRIORITY_BALANCED_POWER_ACCURACY = 102,
  /**
   * City level accuracy. City level accuracy is considered to be about 10km accuracy.
   * Using a coarse accuracy such as this often consumes less power
   */
  PRIORITY_LOW_POWER = 104,
  /**
   * No locations will be returned unless a different client has requested location updates in which case
   * this request will act as a passive listener to those locations. Will use no additional power
   */
  PRIORITY_NO_POWER = 105,
}
