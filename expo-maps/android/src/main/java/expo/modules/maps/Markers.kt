package expo.modules.maps

interface Markers {
    fun setMarkers(markerObjects: Array<MarkerObject>)
    fun detachAndDeleteMarkers()
}