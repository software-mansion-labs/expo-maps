import GoogleMaps

class GoogleMapsMarkers: Markers {

  private let mapView: GMSMapView
  private var markers: [GMSMarker] = []

  init(mapView: GMSMapView) {
    self.mapView = mapView
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let marker: GMSMarker = createGoogleMarker(markerObject: markerObject)
      
      marker.map = mapView
      markers.append(marker)
    }
  }

  internal func detachAndDeleteMarkers() {
    for marker in markers {
      marker.map = nil
    }
    markers = []
  }
}
