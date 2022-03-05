import MapKit

class ExpoAppleMapsPolyline: MKPolyline {
  var color: UIColor = UIColor.blue
  var width: Float = 1.0
  var pattern: [NSNumber]? = nil
  var jointType: CGLineJoin = CGLineJoin.miter
  var capType: CGLineCap = CGLineCap.round
}
