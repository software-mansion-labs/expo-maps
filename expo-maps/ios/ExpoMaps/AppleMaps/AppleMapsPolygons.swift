import MapKit

class AppleMapsPolygons: Polygons {
  
  private let mapView: MKMapView
  private var polygons: [MKPolygon] = []
  private var kmlPolygons: [MKPolygon] = []

  init(mapView: MKMapView) {
    self.mapView = mapView
  }

  func setPolygons(polygonObjects: [PolygonObject]) {
    detachAndDeletePolygons()
    for polygonObject in polygonObjects {
      let polygon = createPolygon(polygonObject: polygonObject)
      mapView.addOverlay(polygon)
      polygons.append(polygon)
    }
  }
  
  func setKMLPolygons(polygonObjects: [PolygonObject]) {
    detachAndDeleteKMLPolygons()
    for polygonObject in polygonObjects {
      let polygon = createPolygon(polygonObject: polygonObject)
      mapView.addOverlay(polygon)
      kmlPolygons.append(polygon)
    }
  }

  internal func detachAndDeletePolygons() {
    mapView.removeOverlays(polygons)
    polygons = []
  }
  
  private func detachAndDeleteKMLPolygons() {
    mapView.removeOverlays(kmlPolygons)
    kmlPolygons = []
  }
  
  private func createPolygon(polygonObject: PolygonObject) -> MKPolygon {
    var overlayPoints: [CLLocationCoordinate2D] = []
    for point in polygonObject.points {
      overlayPoints.append(
        CLLocationCoordinate2D(latitude: point.latitude, longitude: point.longitude))
    }
    let polygon = ExpoMKPolygon(coordinates: &overlayPoints, count: overlayPoints.count)
    if polygonObject.fillColor != nil { polygon.fillColor = polygonObject.fillColor! }
    if polygonObject.strokeColor != nil { polygon.strokeColor = polygonObject.strokeColor! }
    if polygonObject.strokeWidth != nil { polygon.strokeWidth = polygonObject.strokeWidth! }
    if polygonObject.strokePattern != nil {
      polygon.strokePattern = strokePatternToLineDashPattern(
        pattern: polygonObject.strokePattern, width: polygon.strokeWidth)
      if polygonObject.strokeWidth == nil {polygon.strokeWidth = 1.0}
    }
    polygon.jointType = jointToCGLineJoin(polygonObject.jointType)
    
    return polygon
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

  private func strokePatternToLineDashPattern(pattern: [PatternItem]?, width: Float = 2) -> [NSNumber]? {
    if pattern == nil { return nil }
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
        if !LDP.isEmpty {
          LDP[LDP.count - 1] = NSNumber(value: LDP.last as! Float + patternItem.length)
        }
      }
    }
    return LDP
  }
}
