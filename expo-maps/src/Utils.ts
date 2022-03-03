import { Marker } from "./Marker";
import { Polygon } from "./Polygon";
import { Polyline } from "./Polyline";
import { Circle } from "./Circle";

export function isSimpleType(child: any) {
  return (
    typeof child == "string" ||
    typeof child == "boolean" ||
    typeof child == "number" ||
    child == null ||
    child == undefined
  );
}

export function isCircle(child: any): child is Circle {
  if (
    "type" in child &&
    String(child.type).includes("Circle") &&
    "props" in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes("center") && props.includes("radius")) {
      return true;
    }
  }
  return false;
}

export function isPolygon(child: any): child is Polygon {
  if (
    "type" in child &&
    String(child.type).includes("Polygon") &&
    "props" in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes("points")) {
      return true;
    }
  }
  return false;
}

export function isPolyline(child: any): child is Polyline {
  if (
    "type" in child &&
    String(child.type).includes("Polyline") &&
    "props" in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes("points")) {
      return true;
    }
  }
  return false;
}

export function isMarker(child: any): child is Marker {
  if (
    "type" in child &&
    String(child.type).includes("Marker") &&
    "props" in child
  ) {
    let props = Object.keys(child.props);
    if (props.includes("latitude") && props.includes("longitude")) {
      return true;
    }
  }
  return false;
}
