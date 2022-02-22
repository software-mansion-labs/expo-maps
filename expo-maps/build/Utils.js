export function isSimpleType(child) {
    return (typeof child == 'string' ||
        typeof child == 'boolean' ||
        typeof child == 'number' ||
        child == null ||
        child == undefined);
}
export function isPolygon(child) {
    if ('type' in child && String(child.type).includes('Polygon') && 'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('points')) {
            return true;
        }
    }
    return false;
}
export function isPolyline(child) {
    if ('type' in child && String(child.type).includes('Polyline') && 'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('points')) {
            return true;
        }
    }
    return false;
}
export function isMarker(child) {
    if ('type' in child && String(child.type).includes('Marker') && 'props' in child) {
        let props = Object.keys(child.props);
        if (props.includes('latitude') && props.includes('longitude')) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=Utils.js.map