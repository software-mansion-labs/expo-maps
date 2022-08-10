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
/**
 * Type describing points of interest on the map
 */
export declare type PointOfInterest = {
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
export declare type Marker = {
    /**
     * Id given to the marker
     */
    id: string;
    /**
     * Latitude of the marker
     * @required
     */
    latitude: Number;
    /**
     * Latitude of the marker
     * @required
     */
    longitude: Number;
    /**
     * Title of the marker
     */
    markerTitle: string;
    /**
     * Description of the marker
     */
    markerSnippet: String;
    /**
     * Url of the icon representing the marker
     */
    icon: string;
    /**
     * Color of the marker
     */
    color: string;
    /**
     * Determines if the marker can be dragged by the user
     */
    draggable: Boolean;
    anchorU: Number;
    anchorV: Number;
    /**
     * Opacity of the marker
     */
    opacity: Number;
};
export declare type MapCluster = {
    /**
     * Position of the point of interest
     * @required
     */
    position: Point;
    /**
     * Children belonging to the cluster
     * @required
     */
    items: Marker[];
    /**
     * Number of children in the cluster
     * @required
     */
    size: Number;
};
export declare type Color = 'red' | 'blue' | 'green' | 'black' | 'white' | 'gray' | 'cyan' | 'magenta' | 'yellow' | 'lightgray' | 'darkgray' | 'aqua' | 'fuchsia' | 'lime' | 'maroon' | 'navy' | 'olive' | 'purple' | 'silver' | 'teal';
