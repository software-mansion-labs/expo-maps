import GoogleMaps

final class GoogleMapsGestures: Gestures {

  internal var mapView: GMSMapView

  init(mapView: GMSMapView) {
    self.mapView = mapView
  }

  init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func setEnabledRotateGesture(enabled: Bool) {
    mapView.settings.rotateGestures = enabled
  }

  func setEnabledScrollGesture(enabled: Bool) {
    mapView.settings.scrollGestures = enabled
  }

  func setEnabledTiltGesture(enabled: Bool) {
    mapView.settings.tiltGestures = enabled
  }

  func setEnabledZoomGesture(enabled: Bool) {
    mapView.settings.zoomGestures = enabled
  }

  func setEnabledAllGestures(enabled: Bool) {
    mapView.settings.setAllGesturesEnabled(enabled)
  }
}
