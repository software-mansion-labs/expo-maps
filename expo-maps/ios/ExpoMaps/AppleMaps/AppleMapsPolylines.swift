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
      let dotLength = polylineObject.capType == .butt ? polyline.width : 0
      polyline.pattern = strokePatternToLineDashPattern(pattern: polylineObject.pattern, dotLength: dotLength)
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
  
  private func strokePatternToLineDashPattern(pattern: [PatternItem]?, dotLength: Float) -> [NSNumber]? {
    if pattern == nil {return nil}
    var LDP: [NSNumber] = []
    for patternItem in pattern! {
      // Parity of so-far array is the easiest indicator, whether last inserted element is a stroke or a gap
      switch (patternItem.type, patternItem.length, LDP.count % 2) {
      case (.stroke, 0, 0): // Dot after gap
        LDP.append(NSNumber(value: dotLength))
        LDP.append(1)
      case (.stroke, _, 0): // Dash after gap
        LDP.append(NSNumber(value: patternItem.length))
      case (.stroke, _, 0): // Dot after dash
        LDP.append(1)
        LDP.append(NSNumber(value: dotLength))
        LDP.append(1)
      case (.stroke, _, _): // Dash after dash (merge)
        LDP[LDP.count - 1] = NSNumber(value: LDP.last as! Float + patternItem.length)
      case (.gap, _, 1): // Gap after any stroke
        LDP.append(NSNumber(value: patternItem.length))
      case _: // Gap after gap (merge)
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
