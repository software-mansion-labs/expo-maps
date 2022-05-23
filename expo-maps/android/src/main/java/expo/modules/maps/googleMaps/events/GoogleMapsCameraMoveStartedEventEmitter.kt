package expo.modules.maps.googleMaps.events

import android.os.Bundle
import com.google.android.gms.maps.GoogleMap

class GoogleMapsCameraMoveStartedEventEmitter(
  override val googleMap: GoogleMap,
  override val sendEvent: (String, Bundle?) -> Unit
) : GoogleMapsCameraEventEmitter<GoogleMap.OnCameraMoveStartedListener>() {

  init {
    updateMapListener()
  }

  override val name: String = MapEventsNames.ON_CAMERA_MOVE_STARTED_EVENT.eventName
  override val baseListener: GoogleMap.OnCameraMoveStartedListener = GoogleMap.OnCameraMoveStartedListener {
    val latitude: Double = googleMap.cameraPosition.target.latitude
    val longitude: Double = googleMap.cameraPosition.target.longitude
    sendEvent(name, createCameraEventContent(latitude, longitude))
  }

  override fun updateMapListener() {
    googleMap.setOnCameraMoveStartedListener {
      baseListener.onCameraMoveStarted(it)
      listeners.forEach { listener ->
        listener.onCameraMoveStarted(it)
      }
    }
  }
}