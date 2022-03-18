package expo.modules.maps.googleMaps

import android.net.Uri
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import expo.modules.maps.MarkerObject
import expo.modules.maps.interfaces.Markers

class GoogleMapsMarkers(private val map: GoogleMap) : Markers {

  private val markers = mutableListOf<Marker>()

  override fun setMarkers(markerObjects: Array<MarkerObject>) {
    detachAndDeleteMarkers()

    markerObjects.forEach { markerObject ->
      val markerOptions = MarkerOptions()
      val localUri = markerObject.icon?.let { Uri.parse(it)?.path }
      markerOptions
        .position(LatLng(markerObject.latitude, markerObject.longitude))
        .title(markerObject.markerTitle)
        .snippet(markerObject.markerSnippet)
        .draggable(markerObject.draggable)
        .anchor((markerObject.anchorU ?: 0.5).toFloat(), (markerObject.anchorV ?: 1).toFloat())
        .alpha(markerObject.opacity.toFloat())
        .icon(provideDescriptor(localUri, markerObject.color))

      map.addMarker(markerOptions)?.let { markers.add(it) }
    }
  }

  override fun detachAndDeleteMarkers() {
    markers.forEach { it.remove() }
    markers.clear()
  }
}
