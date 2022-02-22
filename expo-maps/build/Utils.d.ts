import { Marker } from './Marker';
import { Polygon } from './Polygon';
import { Polyline } from './Polyline';
export declare function isSimpleType(child: any): boolean;
export declare function isPolygon(child: any): child is Polygon;
export declare function isPolyline(child: any): child is Polyline;
export declare function isMarker(child: any): child is Marker;
