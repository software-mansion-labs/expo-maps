import MapKit

class ExpoAppleMapsPolyline: MKPolyline {
  var color: UIColor = UIColor.red
  var width: Float = 2.0
  var pattern: [NSNumber]? = nil
  var jointType: CGLineJoin = CGLineJoin.miter
  var capType: CGLineCap = CGLineCap.round
}
