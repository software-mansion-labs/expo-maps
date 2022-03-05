import MapKit

class AppleMapsViewDelegate: NSObject, MKMapViewDelegate {

  func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
    switch overlay {
    case let polygon as ExpoAppleMapsPolygon:
      let renderer = MKPolygonRenderer(overlay: polygon)
      renderer.fillColor = polygon.fillColor
      renderer.strokeColor = polygon.strokeColor
      renderer.lineWidth = CGFloat(polygon.strokeWidth)
      if polygon.strokePattern != nil { renderer.lineDashPattern = polygon.strokePattern }
      renderer.lineJoin = polygon.jointType
      return renderer
    case let polyline as ExpoAppleMapsPolyline:
      let renderer = MKPolylineRenderer(overlay: polyline)
      renderer.strokeColor = polyline.color
      renderer.lineWidth = CGFloat(polyline.width)
      if polyline.pattern != nil { renderer.lineDashPattern = polyline.pattern }
      renderer.lineJoin = polyline.jointType
      renderer.lineCap = polyline.capType
      return renderer
    case let circle as ExpoAppleMapsCircle:
      let renderer = MKCircleRenderer(overlay: circle)
      renderer.fillColor = circle.fillColor
      renderer.lineWidth = CGFloat(circle.strokeWidth)
      renderer.strokeColor = circle.strokeColor
      return renderer
    default:
      return MKOverlayRenderer()
    }
  }

  func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {

    if let annotation = annotation as? ExpoAppleMapsAnnotation {
      let identifier = NSStringFromClass(ExpoAppleMapsAnnotation.self)
      let view = mapView.dequeueReusableAnnotationView(withIdentifier: identifier, for: annotation)

      if let markerAnnotationView = view as? MKMarkerAnnotationView {
        let iconURL =
          (annotation.glyphImage != nil) ? URL(fileURLWithPath: annotation.glyphImage!) : nil
        markerAnnotationView.isDraggable = annotation.isDraggable
        markerAnnotationView.centerOffset = CGPoint(
          x: annotation.centerOffsetX, y: annotation.centerOffsetY)
        markerAnnotationView.alpha = annotation.alpha

        if iconURL != nil {
          markerAnnotationView.glyphImage = UIImage(contentsOfFile: iconURL!.path)
        } else {
          let color =
            annotation.markerTintColor.truncatingRemainder(
              dividingBy: Resources.HUE_WHEEL_MAX_VALUE) / Resources.HUE_WHEEL_MAX_VALUE
          markerAnnotationView.markerTintColor = UIColor(
            hue: color, saturation: 1, brightness: 1, alpha: 1)
        }
      }

      return view
    }

    return nil
  }
}
