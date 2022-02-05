package expo.modules.maps

interface Polygons {
    fun setMarkers(polygonObjects: Array<PolygonObject>)
    fun detachAndDeletePolygons()
}
