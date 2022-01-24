import MapKit

class AppleMapsMarkers: Markers {
  private let mapView: MKMapView
  private var markers: [MKPointAnnotation] = []
  
  init(mapView: MKMapView) {
    self.mapView = mapView
  }
  
  func setMarkers(markerObjects: [MarkerObject]) {
    self.detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let marker = MKPointAnnotation()
      marker.coordinate = CLLocationCoordinate2D(latitude: markerObject.latitude, longitude: markerObject.longitude)
      self.mapView.addAnnotation(marker)
      self.markers.append(marker)
    }
  }
  
  internal func detachAndDeleteMarkers() {
    for marker in self.markers {
      self.mapView.removeAnnotation(marker)
    }
    self.markers = []
  }
}
