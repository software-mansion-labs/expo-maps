import GoogleMaps

class GoogleMapsMarkers: Markers {
  private let mapView: GMSMapView
  private var markers: [GMSMarker] = []
  
  init(mapView: GMSMapView) {
    self.mapView = mapView
  }
  
  func setMarkers(markerObjects: [MarkerObject]) {
    self.detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let position = CLLocationCoordinate2D(latitude: markerObject.latitude!, longitude: markerObject.longitude!)
      let marker = GMSMarker(position: position)
      marker.map = self.mapView
      self.markers.append(marker)
    }
  }
  
  internal func detachAndDeleteMarkers() -> Void {
    for marker in self.markers {
      marker.map = nil
    }
    self.markers = []
  }
}
