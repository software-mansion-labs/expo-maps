import MapKit

/*
 Returns asset based marker icon when markerObject.icon is not null, otherwise returns default marker with provided color.
 */
func createAppleMarker(markerObject: MarkerObject) -> ExpoMKAnnotation {
  let iconURL = (markerObject.icon != nil) ? URL(fileURLWithPath: markerObject.icon!) : nil
  
  if (iconURL != nil) {
    let marker = ExpoMKImageAnnotation(coordinate: CLLocationCoordinate2D(latitude: markerObject.latitude, longitude: markerObject.longitude))
    marker.title = markerObject.markerTitle
    marker.subtitle = markerObject.markerSnippet
    marker.icon = iconURL!.standardized.path
    marker.isDraggable = markerObject.draggable
    marker.centerOffsetX = markerObject.anchorU ?? 0
    marker.centerOffsetY = markerObject.anchorV ?? 0
    marker.alpha = markerObject.opacity
    
    return marker
  } else {
    let marker = ExpoMKColorAnnotation(coordinate: CLLocationCoordinate2D(latitude: markerObject.latitude, longitude: markerObject.longitude))
    var hue: CGFloat = 0
    markerObject.color?.getHue(&hue, saturation: nil, brightness: nil, alpha: nil)
    marker.title = markerObject.markerTitle
    marker.subtitle = markerObject.markerSnippet
    marker.isDraggable = markerObject.draggable
    marker.color = hue
    marker.centerOffsetX = markerObject.anchorU ?? 0
    marker.centerOffsetY = markerObject.anchorV ?? 0
    marker.alpha = markerObject.opacity
    
    return marker
  }
}

func jointToCGLineJoin(_ jointType: Joint?) -> CGLineJoin {
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

func strokePatternToLineDashPatternPolygon(pattern: [PatternItem]?, width: Float = 2) -> [NSNumber]? {
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

func strokePatternToLineDashPatternPolyline(pattern: [PatternItem]?, dotLength: Float) -> [NSNumber]? {
  if pattern == nil { return nil }
  var LDP: [NSNumber] = []
  for patternItem in pattern! {
    // Parity of so-far array is the easiest indicator, whether last inserted element is a stroke or a gap
    switch (patternItem.type, patternItem.length, LDP.count % 2) {
    case (.stroke, 0, 0):  // Dot after gap
      LDP.append(NSNumber(value: dotLength))
      LDP.append(1)
    case (.stroke, _, 0):  // Dash after gap
      LDP.append(NSNumber(value: patternItem.length))
    case (.stroke, _, 0):  // Dot after dash
      LDP.append(1)
      LDP.append(NSNumber(value: dotLength))
      LDP.append(1)
    case (.stroke, _, _):  // Dash after dash (merge)
      LDP[LDP.count - 1] = NSNumber(value: LDP.last as! Float + patternItem.length)
    case (.gap, _, 1):  // Gap after any stroke
      LDP.append(NSNumber(value: patternItem.length))
    case _:  // Gap after gap (merge)
      if !LDP.isEmpty {
        LDP[LDP.count - 1] = NSNumber(value: LDP.last as! Float + patternItem.length)
      }
    }
  }
  return LDP
}
