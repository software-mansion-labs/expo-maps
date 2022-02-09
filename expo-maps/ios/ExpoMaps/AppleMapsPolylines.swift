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
      let polyline = MKPolyline(coordinates: &overlayPoints, count: overlayPoints.count)
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
}
