import { Cluster } from './Cluster';
import { Color } from './Common.types';
import { Marker } from './Marker';
import { Polygon } from './Polygon';
import { Polyline } from './Polyline';
import { Circle } from './Circle';
import { KML } from './KML';
import { GeoJson } from './GeoJson';

export function isSimpleType(child: any) {
  return (
    typeof child == 'string' ||
    typeof child == 'boolean' ||
    typeof child == 'number' ||
    child == null ||
    child == undefined
  );
}

export function isPolygon(child: any): child is Polygon {
  if (
    'type' in child &&
    String(child.type).includes('Polygon') &&
    'props' in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes('points')) {
      return true;
    }
  }
  return false;
}

export function isPolyline(child: any): child is Polyline {
  if (
    'type' in child &&
    String(child.type).includes('Polyline') &&
    'props' in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes('points')) {
      return true;
    }
  }
  return false;
}

export function isCircle(child: any): child is Circle {
  if (
    'type' in child &&
    String(child.type).includes('Circle') &&
    'props' in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes('center') && props.includes('radius')) {
      return true;
    }
  }
  return false;
}

export function isMarker(child: any): child is Marker {
  if (
    'type' in child &&
    String(child.type).includes('Marker') &&
    'props' in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes('latitude') && props.includes('longitude')) {
      return true;
    }
  }
  return false;
}

export function isCluster(child: any): child is Cluster {
  if (
    'type' in child &&
    String(child.type).includes('Cluster') &&
    'props' in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes('name')) {
      return true;
    }
  }
  return false;
}

export function isKML(child: any): child is KML {
  if (
    'type' in child &&
    String(child.type).includes('KML') &&
    'props' in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes('filePath')) {
      return true;
    }
  }
  return false;
}

export function isGeoJson(child: any): child is GeoJson {
  if (
    'type' in child &&
    String(child.type).includes('GeoJson') &&
    'props' in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes('geoJsonString')) {
      return true;
    }
  }
  return false;
}

export function mapColor(color: Color): number {
  const colors: Record<Color | 'default', number> = {
    azure: 210,
    blue: 240,
    cyan: 180,
    green: 120,
    magenta: 300,
    orange: 30,
    rose: 330,
    violet: 270,
    yellow: 60,
    red: 0,
    default: 0,
  };

  return colors[color] || colors['default'];
}

export function warnIfChildIsIncompatible(child: any) {
  if (
    typeof child == 'string' ||
    typeof child == 'boolean' ||
    typeof child == 'number'
  ) {
    console.warn(
      `Warning! Child of type ${typeof child} isn't valid ExpoMap child!`
    );
  } else if (child != null && child != undefined) {
    console.log(child.type);
    console.warn(
      `Warning! Child of type ${
        (child as React.ReactElement<any>).type
      } isn't valid ExpoMap child!`
    );
  }
}
