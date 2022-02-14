import MapKit

class AppleMapsViewDelegate : NSObject, MKMapViewDelegate {
  
  func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
    if overlay is MKPolygon {
        let renderer = MKPolygonRenderer(overlay: overlay)
        renderer.fillColor = UIColor.red.withAlphaComponent(0.5)
        renderer.strokeColor = UIColor.red
        renderer.lineWidth = 2
        return renderer
    } else if overlay is MKPolyline {
        let renderer = MKPolylineRenderer(overlay: overlay)
        renderer.fillColor = UIColor.red.withAlphaComponent(0.5)
        renderer.strokeColor = UIColor.red
        renderer.lineWidth = 2
        return renderer
    }
    return MKOverlayRenderer()
  }
  
  func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
    
    if let annotation = annotation as? ExpoAppleMapsAnnotation {
      let identifier = NSStringFromClass(ExpoAppleMapsAnnotation.self)
      let view = mapView.dequeueReusableAnnotationView(withIdentifier: identifier, for: annotation)
      
      if let markerAnnotationView = view as? MKMarkerAnnotationView {
        let iconURL = (annotation.glyphImage != nil) ? URL(fileURLWithPath: annotation.glyphImage!) : nil
        markerAnnotationView.isDraggable = annotation.isDraggable
        markerAnnotationView.centerOffset = CGPoint(x: annotation.centerOffsetX, y: annotation.centerOffsetY)
        markerAnnotationView.alpha = annotation.alpha
        
        if (iconURL != nil) {
          markerAnnotationView.glyphImage = UIImage(contentsOfFile: iconURL!.path)
        } else {
          let color = annotation.markerTintColor.truncatingRemainder(dividingBy: Resources.HUE_WHEEL_MAX_VALUE) / Resources.HUE_WHEEL_MAX_VALUE
          markerAnnotationView.markerTintColor = UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1)
        }
      }
      
      return view
    }
    
    return nil
  }
}
