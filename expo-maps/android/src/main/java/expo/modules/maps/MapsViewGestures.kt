package expo.modules.maps

interface Gestures {
  fun setEnabledRotateGesture(enabled: Boolean)
  fun setEnabledScrollGesture(enabled: Boolean)
  fun setEnabledTiltGesture(enabled: Boolean)
  fun setEnabledZoomGesture(enabled: Boolean)
  fun setEnabledAllGestures(enabled: Boolean)
}
