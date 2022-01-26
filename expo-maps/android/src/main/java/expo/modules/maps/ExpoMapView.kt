package expo.modules.maps

interface ExpoMapView {
    fun setMapType(mapType: MapType)
    fun setMarkers(markerObjects: Array<MarkerObject>)
}
