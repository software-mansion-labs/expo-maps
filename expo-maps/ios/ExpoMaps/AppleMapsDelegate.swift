import MapKit

class AppleMapsViewDelegate : NSObject, MKMapViewDelegate {
  func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
    if overlay is MKPolygon {
        let renderer = MKPolygonRenderer(overlay: overlay)
        renderer.fillColor = UIColor.red.withAlphaComponent(0.5)
        renderer.strokeColor = UIColor.red
        renderer.lineWidth = 2
        return renderer
    }
    return MKOverlayRenderer()
  }
}
