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
        .anchor(markerObject.anchorU.toFloat(), markerObject.anchorV.toFloat())
        .alpha(markerObject.opacity.toFloat())
        .zIndex(markerObject.zIndex.toFloat())

      if (localUri != null) {
        markerOptions.icon(BitmapDescriptorFactory.fromPath(localUri))
      } else {
        markerOptions.icon(BitmapDescriptorFactory.defaultMarker(getHueColor(markerObject.defaultMarkerColor)))
      }

      googleMap.addMarker(markerOptions)?.let { markers.add(it) }
    }
  }

  override fun detachAndDeleteMarkers() {
    markers.forEach { it.remove() }
    markers.clear()
  }

  private fun getHueColor(markerColor: MarkerColor): Float {
    return when (markerColor) {
      MarkerColor.Red -> BitmapDescriptorFactory.HUE_RED
      MarkerColor.Azure -> BitmapDescriptorFactory.HUE_AZURE
      MarkerColor.Blue -> BitmapDescriptorFactory.HUE_BLUE
      MarkerColor.Cyan -> BitmapDescriptorFactory.HUE_CYAN
      MarkerColor.Green -> BitmapDescriptorFactory.HUE_GREEN
      MarkerColor.Magenta -> BitmapDescriptorFactory.HUE_MAGENTA
      MarkerColor.Orange -> BitmapDescriptorFactory.HUE_ORANGE
      MarkerColor.Rose -> BitmapDescriptorFactory.HUE_ROSE
      MarkerColor.Violet -> BitmapDescriptorFactory.HUE_VIOLET
      MarkerColor.Yellow -> BitmapDescriptorFactory.HUE_YELLOW
    }
  }
}
