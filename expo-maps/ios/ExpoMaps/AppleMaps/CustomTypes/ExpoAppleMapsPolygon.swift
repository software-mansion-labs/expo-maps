import MapKit

class ExpoAppleMapsPolygon: MKPolygon {
  var fillColor: UIColor = UIColor.red.withAlphaComponent(0.5)
  var strokeColor: UIColor = UIColor.red
  var strokeWidth: Float = 2.0
  var strokePattern: [NSNumber]? = nil
  var jointType: CGLineJoin = CGLineJoin.miter
}
