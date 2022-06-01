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
