package expo.modules.maps

import android.net.Uri
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions

class GoogleMapsMarkers(map: GoogleMap) : Markers {
  private val markers = mutableListOf<Marker>()
  private var googleMap: GoogleMap = map

  override fun setMarkers(markerObjects: Array<MarkerObject>) {
    detachAndDeleteMarkers()

    markerObjects.forEach { markerObject ->
      val markerOptions = MarkerOptions()
      val localUri = markerObject.icon?.let { Uri.parse(it)?.path }
      markerOptions
        .position(LatLng(markerObject.latitude, markerObject.longitude))
        .title(markerObject.title)
        .snippet(markerObject.snippet)
        .draggable(markerObject.draggable)
        .anchor((markerObject.anchorU ?: 0.5).toFloat(), (markerObject.anchorV ?: 1).toFloat())
        .alpha(markerObject.opacity.toFloat())

      if (localUri != null) {
        markerOptions.icon(BitmapDescriptorFactory.fromPath(localUri))
      } else {
        markerOptions.icon(
          BitmapDescriptorFactory.defaultMarker(
            (markerObject.defaultMarkerColor % HUE_WHEEL_MAX_VALUE).toFloat()
          )
        )
      }

      googleMap.addMarker(markerOptions)?.let { markers.add(it) }
    }
  }

  override fun detachAndDeleteMarkers() {
    markers.forEach { it.remove() }
    markers.clear()
  }

  companion object {
    const val HUE_WHEEL_MAX_VALUE = 360
  }
}
