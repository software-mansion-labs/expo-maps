import GoogleMaps

/*
 Returns asset based marker icon when markerObject.icon is not null, otherwise returns default marker with provided color.
 */
func createGoogleMarker(markerObject: MarkerObject) -> GMSMarker {
  let position = CLLocationCoordinate2D(latitude: markerObject.latitude, longitude: markerObject.longitude)
  let marker = GMSMarker(position: position)
  let iconURL = (markerObject.icon != nil) ? URL(fileURLWithPath: markerObject.icon!) : nil
  marker.title = markerObject.markerTitle
  marker.snippet = markerObject.markerSnippet
  marker.isDraggable = markerObject.draggable
  marker.groundAnchor = CGPoint(x: markerObject.anchorU ?? 0.5, y: markerObject.anchorV ?? 1)
  marker.opacity = Float(markerObject.opacity)
  
  if (iconURL != nil) {
    marker.icon = UIImage(contentsOfFile: iconURL!.standardized.path)
  } else {
    let color = markerObject.color.truncatingRemainder(dividingBy: Resources.HUE_WHEEL_MAX_VALUE) / Resources.HUE_WHEEL_MAX_VALUE
    marker.icon = GMSMarker.markerImage(with: UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1))
  }
  
  return marker
}
