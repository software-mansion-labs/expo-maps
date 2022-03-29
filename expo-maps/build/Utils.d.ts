import { Cluster } from './Cluster';
import { Color } from './Common.types';
import { Marker } from './Marker';
import { Polygon } from './Polygon';
import { Polyline } from './Polyline';
import { Circle } from './Circle';
import { KML } from './KML';
import { GeoJson } from './GeoJson';
export declare function isSimpleType(child: any): boolean;
export declare function isPolygon(child: any): child is Polygon;
export declare function isPolyline(child: any): child is Polyline;
export declare function isCircle(child: any): child is Circle;
export declare function isMarker(child: any): child is Marker;
export declare function isCluster(child: any): child is Cluster;
export declare function isKML(child: any): child is KML;
export declare function isGeoJson(child: any): child is GeoJson;
export declare function mapColor(color: Color): number;
export declare function warnIfChildIsIncompatible(child: any): void;
