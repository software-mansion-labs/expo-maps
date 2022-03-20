/**
 * Geographical coordinates of the point on the map
 *
 * @field latitude - latitude part of coordinates
 * @field longitude - longitude part of coordinates
 */
export declare type Point = {
    latitude: number;
    longitude: number;
};
/**
 * PatternItem is used to define a repeating pattern for polyline and polygon line.
 * PatternItem with type `stroke` and length 0 will represent a dot.
 * Use an array of PatternItem to define a pattern.
 *
 * @field type - TODO
 * @field length - TODO
 */
export declare type PatternItem = {
    type: 'stroke' | 'gap';
    length: number;
};
