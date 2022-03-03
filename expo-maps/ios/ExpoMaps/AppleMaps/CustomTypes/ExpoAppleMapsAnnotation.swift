import MapKit

class ExpoAppleMapsAnnotation: NSObject, MKAnnotation {

  // This property must be key-value observable, which the `@objc dynamic` attributes provide.
  @objc dynamic var coordinate: CLLocationCoordinate2D

  var title: String? = nil

  var subtitle: String? = nil

  var glyphImage: String? = nil

  var markerTintColor: Double = 0

  var isDraggable: Bool = false

  var centerOffsetX: Double = 0

  var centerOffsetY: Double = 0

  var alpha: Double = 1

  init(coordinate: CLLocationCoordinate2D) {
    self.coordinate = coordinate
    super.init()
  }

  func setCoordinate(newCoordinate: CLLocationCoordinate2D) {
    coordinate = newCoordinate
  }
}
