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

export function isHexColor(color: any): color is Color {
  return color.length > 0 && color[0] == '#';
}

export function mapColorToHexColor(
  color: Color,
  defaultColor?: string
): string {
  let defColor = defaultColor;
  if (defColor == undefined) defColor = '#000000';

  const colors: Record<Color | 'default', string> = {
    red: '#ff0000',
    blue: '#0000ff',
    green: '#00ff00',
    black: '#000000',
    white: '#ffffff',
    gray: '#808080',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    yellow: '#ffff00',
    lightgray: '#d3d3d3',
    darkgray: '#a9a9a9',
    aqua: '#00ffff',
    fuchsia: '#ca2c92',
    lime: '#bfff00',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    purple: '#800080',
    silver: '#c0c0c0',
    teal: '#008080',
    default: defColor,
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
