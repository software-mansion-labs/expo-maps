package expo.modules.maps.googleMaps.events

import androidx.core.os.bundleOf

enum class MapEventsNames(val eventName: String) {
  ON_CAMERA_MOVE_STARTED_EVENT("onCameraMoveStarted"),
  ON_CAMERA_MOVE_ENDED_EVENT("onCameraMoveEnded"),
  ON_MARKER_CLICK_EVENT("onMarkerClick"),
  ON_MARKER_DRAG_STARTED_EVENT("onMarkerDragStarted"),
  ON_MARKER_DRAG_ENDED_EVENT("onMarkerDragEnded"),
}

fun createCameraEventContent(latitude: Double, longitude: Double) =
  bundleOf("latitude" to latitude, "longitude" to longitude)

fun createMarkerClickEventContent(id: String) = bundleOf("id" to id)

fun createMarkerDragStartedEventContent(id: String) = bundleOf("id" to id)

fun createMarkerDragEndedEventContent(id: String, latitude: Double, longitude: Double) =
  bundleOf("id" to id, "latitude" to latitude, "longitude" to longitude)