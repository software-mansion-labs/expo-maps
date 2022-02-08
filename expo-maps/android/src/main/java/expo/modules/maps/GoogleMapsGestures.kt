package expo.modules.maps

import com.google.android.gms.maps.GoogleMap

class GoogleMapsGestures(private val googleMap: GoogleMap) : Gestures {

  override fun setEnabledRotateGesture(enabled: Boolean) {
    googleMap.uiSettings.isRotateGesturesEnabled = enabled
  }

  override fun setEnabledScrollGesture(enabled: Boolean) {
    googleMap.uiSettings.isScrollGesturesEnabled = enabled
  }

  override fun setEnabledTiltGesture(enabled: Boolean) {
    googleMap.uiSettings.isTiltGesturesEnabled = enabled
  }

  override fun setEnabledZoomGesture(enabled: Boolean) {
    googleMap.uiSettings.isZoomGesturesEnabled = enabled
  }

  override fun setEnabledAllGestures(enabled: Boolean) {
    googleMap.uiSettings.setAllGesturesEnabled(enabled)
  }
}
