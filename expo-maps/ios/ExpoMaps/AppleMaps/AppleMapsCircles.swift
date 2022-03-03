import MapKit

class AppleMapsCircles: Circles {
  private let mapView: MKMapView
  private var circles: [MKCircle] = []

  init(mapView: MKMapView) {
    self.mapView = mapView
  }

  func setCircles(circleObjects: [CircleObject]) {
    detachAndDeleteCircles()
    for circleObject in circleObjects {
      let circle = ExpoAppleMapsCircle(
        center: CLLocationCoordinate2D(
          latitude: circleObject.center.latitude, longitude: circleObject.center.longitude),
        radius: circleObject.radius
      )
      circle.fillColor = circleObject.fillColor ?? circle.fillColor
      circle.strokeColor = circleObject.strokeColor ?? circle.strokeColor
      circle.strokeWidth = circleObject.strokeWidth ?? circle.strokeWidth
      mapView.addOverlay(circle)
      circles.append(circle)
    }
  }

  internal func detachAndDeleteCircles() {
    for circle in circles {
      self.mapView.removeOverlay(circle)
    }
    circles = []
  }
}
