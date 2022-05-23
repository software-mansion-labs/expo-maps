package expo.modules.maps.googleMaps

import android.net.Uri
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import com.google.maps.android.collections.MarkerManager
import expo.modules.maps.MarkerObject
import expo.modules.maps.googleMaps.events.GoogleMapsEventEmitterManager
import expo.modules.maps.interfaces.Markers

class GoogleMapsMarkers(markerManager: MarkerManager) : Markers {

  private val markers = mutableMapOf<Marker, String?>()
  private val markerManagerCollection: MarkerManager.Collection = markerManager.Collection()

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

      markerManagerCollection.addMarker(markerOptions).let {
        markers[it] = markerObject.id
      }
    }
  }

  fun setOnMarkerClickListener(eventEmitterManager: GoogleMapsEventEmitterManager) {
    markerManagerCollection.setOnMarkerClickListener { marker ->
      markers[marker]?.let {
        eventEmitterManager.sendMarkerClickEvent(it)
      }
      false
    }
  }

  fun setOnMarkerDragListener(eventEmitterManager: GoogleMapsEventEmitterManager) {
    markerManagerCollection.setOnMarkerDragListener(object : GoogleMap.OnMarkerDragListener {

      override fun onMarkerDrag(marker: Marker) = Unit

      override fun onMarkerDragEnd(marker: Marker) {
        markers[marker]?.let {
          eventEmitterManager.sendMarkerDragEndedEvent(it, marker.position.latitude, marker.position.longitude)
        }
      }

      override fun onMarkerDragStart(marker: Marker) {
        markers[marker]?.let {
          eventEmitterManager.sendMarkerDragStartedEvent(it)
        }
      }
    })
  }

  override fun detachAndDeleteMarkers() {
    markerManagerCollection.clear()
    markers.clear()
  }
}
