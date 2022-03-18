export declare type Point = {
    latitude: number;
    longitude: number;
};
/**
 * PatternItem is used to define a repeating pattern for polyline and polygon line.
 * PatternItem with type 'stroke' and length 0 will represent a dot.
 * Use an array of PatternItem to define a pattern.
 */
export declare type PatternItem = {
    type: 'stroke' | 'gap';
    length: number;
};
export declare type Color = 'azure' | 'blue' | 'cyan' | 'green' | 'magenta' | 'orange' | 'red' | 'rose' | 'violet' | 'yellow';
