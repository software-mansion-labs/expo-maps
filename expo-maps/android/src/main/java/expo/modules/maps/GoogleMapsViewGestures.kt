package expo.modules.maps

import com.google.android.gms.maps.GoogleMap

class GoogleMapsViewGestures() : MapsViewGestures {

  private var googleMap: GoogleMap? = null

  fun initMap(googleMap: GoogleMap) {
    this.googleMap = googleMap
  }

  override fun setEnabledRotateGesture(enabled: Boolean) {
    googleMap?.uiSettings?.isRotateGesturesEnabled = enabled
  }

  override fun setEnabledScrollGesture(enabled: Boolean) {
    googleMap?.uiSettings?.isScrollGesturesEnabled = enabled
  }

  override fun setEnabledTiltGesture(enabled: Boolean) {
    googleMap?.uiSettings?.isTiltGesturesEnabled = enabled
  }

  override fun setEnabledZoomGesture(enabled: Boolean) {
    googleMap?.uiSettings?.isZoomGesturesEnabled = enabled
  }

  override fun setEnabledAllGestures(enabled: Boolean) {
    googleMap?.uiSettings?.setAllGesturesEnabled(enabled)
  }
}