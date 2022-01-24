import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import expo.modules.maps.MarkerObject
import expo.modules.maps.Markers

class GoogleMapsMarkers(map: GoogleMap): Markers {
    private val markers = mutableListOf<Marker>()
    private var googleMap: GoogleMap = map

    override fun setMarkers(markerObjects: Array<MarkerObject>) {
        this.detachAndDeleteMarkers()
        for (markerObject in markerObjects) {
            val markerOptions = MarkerOptions()
            markerOptions.position(LatLng(markerObject.latitude!!, markerObject.longitude!!))
            val marker = this.googleMap.addMarker(markerOptions)
            this.markers.add(marker!!)
        }
    }

    override fun detachAndDeleteMarkers() {
        for (marker in this.markers) {
            marker.remove()
        }
        this.markers.clear()
    }
}