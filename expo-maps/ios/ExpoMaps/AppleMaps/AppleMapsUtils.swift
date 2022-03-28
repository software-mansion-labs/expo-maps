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
    let color = markerObject.color.truncatingRemainder(dividingBy: Resources.HUE_WHEEL_MAX_VALUE) / Resources.HUE_WHEEL_MAX_VALUE
    marker.title = markerObject.markerTitle
    marker.subtitle = markerObject.markerSnippet
    marker.isDraggable = markerObject.draggable
    marker.color = color
    marker.centerOffsetX = markerObject.anchorU ?? 0
    marker.centerOffsetY = markerObject.anchorV ?? 0
    marker.alpha = markerObject.opacity
    
    return marker
  }
}
