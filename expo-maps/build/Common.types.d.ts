/**
 * Basic point type for representing a coordinate on a map.
 */
export declare type Point = {
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
export declare type PointWithData = Point & {
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
export declare type PatternItem = {
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
export declare type CameraPosition = {
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
export declare type PointOfInterest = {
    latLng: Point;
    name: string;
    placeId: string;
};
export declare type Color = 'red' | 'blue' | 'green' | 'black' | 'white' | 'gray' | 'cyan' | 'magenta' | 'yellow' | 'lightgray' | 'darkgray' | 'aqua' | 'fuchsia' | 'lime' | 'maroon' | 'navy' | 'olive' | 'purple' | 'silver' | 'teal';
