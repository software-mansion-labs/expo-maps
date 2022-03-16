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
export function mapColor(color) {
    switch (color) {
        case 'azure': {
            return 210;
        }
        case 'blue': {
            return 240;
        }
        case 'cyan': {
            return 180;
        }
        case 'green': {
            return 120;
        }
        case 'magenta': {
            return 300;
        }
        case 'orange': {
            return 30;
        }
        case 'rose': {
            return 330;
        }
        case 'violet': {
            return 270;
        }
        case 'yellow': {
            return 60;
        }
        default: {
            return 0;
        }
    }
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