package expo.modules.maps.googleMaps.events

import android.os.Bundle
import com.google.android.gms.maps.GoogleMap

class GoogleMapsCameraMoveEndedEventEmitter(
  override val googleMap: GoogleMap,
  override val sendEvent: (String, Bundle?) -> Unit
) : GoogleMapsCameraEventEmitter<GoogleMap.OnCameraIdleListener>() {

  init {
    updateMapListener()
  }

  override val name: String = MapEventsNames.ON_CAMERA_MOVE_ENDED_EVENT.eventName
  override val baseListener: GoogleMap.OnCameraIdleListener = GoogleMap.OnCameraIdleListener {
    val latitude: Double = googleMap.cameraPosition.target.latitude
    val longitude: Double = googleMap.cameraPosition.target.longitude
    sendEvent(name, createCameraEventContent(latitude, longitude))
  }

  override fun updateMapListener() {
    googleMap.setOnCameraIdleListener {
      baseListener.onCameraIdle()
      listeners.forEach { listener ->
        listener.onCameraIdle()
      }
    }
  }
}