import MapKit

class AppleMapsPolylines: Polylines {
  private let mapView: MKMapView
  private var polylines: [MKPolyline] = []
  
  init(mapView: MKMapView) {
    self.mapView = mapView
  }
  
  func setPolylines(polylineObjects: [PolylineObject]) {
    detachAndDeletePolylines()
    for polylineObject in polylineObjects {
      var overlayPoints: [CLLocationCoordinate2D] = []
      for point in polylineObject.points {
        overlayPoints.append(CLLocationCoordinate2D(latitude: point.latitude, longitude: point.longitude))
      }
      let polyline = ExpoAppleMapsPolyline(coordinates: &overlayPoints, count: overlayPoints.count)
      if polylineObject.color != nil { polyline.color = polylineObject.color! }
      if polylineObject.width != nil { polyline.width = polylineObject.width! }
      polyline.pattern = strokePatternToLineDashPattern(pattern: polylineObject.pattern, width: polyline.width)
      polyline.jointType = jointToCGLineJoin(polylineObject.jointType)
      polyline.capType = capToCGLineCap(polylineObject.capType)
      mapView.addOverlay(polyline)
      polylines.append(polyline)
    }
  }
  
  internal func detachAndDeletePolylines() {
    for polyline in polylines {
      self.mapView.removeOverlay(polyline)
    }
    polylines = []
  }
  
  private func strokePatternToLineDashPattern(pattern: [PatternItem]?, width: Float = 2) -> [NSNumber]? {
    if pattern == nil {return nil}
    var LDP: [NSNumber] = []
    for patternItem in pattern! {
      switch (patternItem.type, LDP.count % 2) {
      case (.stroke, 0):
        LDP.append(NSNumber(value: patternItem.length))
      case (.stroke, _):
        LDP[LDP.count - 1] = NSNumber(value: LDP.last as! Float + patternItem.length)
      case (.gap, 1):
        LDP.append(NSNumber(value: patternItem.length))
      case _:
        if(!LDP.isEmpty) {
          LDP[LDP.count - 1] = NSNumber(value: LDP.last as! Float + patternItem.length)
        }
      }
    }
    return LDP
  }
  
  private func jointToCGLineJoin(_ jointType: Joint?) -> CGLineJoin {
    switch jointType {
    case .miter:
      return .miter
    case .round:
      return .round
    case .bevel:
      return .bevel
    default:
      return .round
    }
  }
  
  private func capToCGLineCap(_ capType: Cap?) -> CGLineCap {
    switch capType {
    case .round:
      return .round
    case .butt:
      return .butt
    case .square:
      return .square
    default:
      return .round
    }
  }
}
