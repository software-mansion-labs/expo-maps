package expo.modules.maps.googleMaps.events

import android.os.Bundle
import com.google.android.gms.maps.GoogleMap

class GoogleMapsEventEmitterManager(private val sendEvent: (String, Bundle?) -> Unit) {

  lateinit var mapsEventEmitterCameraMoveEnded: GoogleMapsCameraMoveEndedEventEmitter

  fun sendMarkerClickEvent(id: String) =
    sendEvent(MapEventsNames.ON_MARKER_CLICK_EVENT.eventName, createMarkerClickEventContent(id))

  fun createEmitters(googleMap: GoogleMap) {
    mapsEventEmitterCameraMoveEnded = GoogleMapsCameraMoveEndedEventEmitter(googleMap, sendEvent)
  }
}
