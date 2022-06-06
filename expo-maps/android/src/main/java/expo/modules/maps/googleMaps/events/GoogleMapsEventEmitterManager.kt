package expo.modules.maps.googleMaps.events

import android.os.Bundle
import com.google.android.gms.maps.GoogleMap

class GoogleMapsEventEmitterManager(private val sendEvent: (String, Bundle?) -> Unit) {

  lateinit var mapsEventEmitterCameraMoveStarted: GoogleMapsCameraMoveStartedEventEmitter
  lateinit var mapsEventEmitterCameraMoveEnded: GoogleMapsCameraMoveEndedEventEmitter

  fun sendMarkerDragStartedEvent(id: String) =
    sendEvent(
      MapEventsNames.ON_MARKER_DRAG_STARTED_EVENT.eventName,
      createMarkerDragStartedEventContent(id)
    )

  fun sendMarkerDragEndedEvent(id: String, latitude: Double, longitude: Double) =
    sendEvent(
      MapEventsNames.ON_MARKER_DRAG_ENDED_EVENT.eventName,
      createMarkerDragEndedEventContent(id, latitude, longitude)
    )

  fun sendMarkerClickEvent(id: String) =
    sendEvent(MapEventsNames.ON_MARKER_CLICK_EVENT.eventName, createMarkerClickEventContent(id))

  fun createEmitters(googleMap: GoogleMap) {
    mapsEventEmitterCameraMoveStarted =
      GoogleMapsCameraMoveStartedEventEmitter(googleMap, sendEvent)
    mapsEventEmitterCameraMoveEnded = GoogleMapsCameraMoveEndedEventEmitter(googleMap, sendEvent)
  }
}
