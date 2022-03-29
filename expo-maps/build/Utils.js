export function isSimpleType(child) {
    return (typeof child == 'string' ||
        typeof child == 'boolean' ||
        typeof child == 'number' ||
        child == null ||
        child == undefined);
}
export function isPolygon(child) {
    if ('type' in child &&
        String(child.type).includes('Polygon') &&
        'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('points')) {
            return true;
        }
    }
    return false;
}
export function isPolyline(child) {
    if ('type' in child &&
        String(child.type).includes('Polyline') &&
        'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('points')) {
            return true;
        }
    }
    return false;
}
export function isCircle(child) {
    if ('type' in child &&
        String(child.type).includes('Circle') &&
        'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('center') && props.includes('radius')) {
            return true;
        }
    }
    return false;
}
export function isMarker(child) {
    if ('type' in child &&
        String(child.type).includes('Marker') &&
        'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('latitude') && props.includes('longitude')) {
            return true;
        }
    }
    return false;
}
export function isCluster(child) {
    if ('type' in child &&
        String(child.type).includes('Cluster') &&
        'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('name')) {
            return true;
        }
    }
    return false;
}
export function isKML(child) {
    if ('type' in child &&
        String(child.type).includes('KML') &&
        'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('filePath')) {
            return true;
        }
    }
    return false;
}
export function isGeoJson(child) {
    if ('type' in child &&
        String(child.type).includes('GeoJson') &&
        'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('geoJsonString')) {
            return true;
        }
    }
    return false;
}
export function mapColor(color) {
    const colors = {
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
export function warnIfChildIsIncompatible(child) {
    if (typeof child == 'string' ||
        typeof child == 'boolean' ||
        typeof child == 'number') {
        console.warn(`Warning! Child of type ${typeof child} isn't valid ExpoMap child!`);
    }
    else if (child != null && child != undefined) {
        console.log(child.type);
        console.warn(`Warning! Child of type ${child.type} isn't valid ExpoMap child!`);
    }
}
//# sourceMappingURL=Utils.js.map