package expo.modules.maps.googleMaps.events

import android.os.Bundle
import com.google.android.gms.maps.GoogleMap

class GoogleMapsEventEmitterManager(private val sendEvent: (String, Bundle?) -> Unit) {

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
}
