import GoogleMaps

class GoogleMapsMarkers: Markers {

  private let mapView: GMSMapView
  private let googleMapsMarkersManager: GoogleMapsMarkersManager

  init(mapView: GMSMapView, googleMapsMarkersManager: GoogleMapsMarkersManager) {
    self.mapView = mapView
    self.googleMapsMarkersManager = googleMapsMarkersManager
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let marker: GMSMarker = createGoogleMarker(markerObject: markerObject, includeDragging: true)
      
      marker.map = mapView
      googleMapsMarkersManager.appendMarker(marker: marker, id: markerObject.id)
    }
  }

  internal func detachAndDeleteMarkers() {
    googleMapsMarkersManager.clearMarkers()
  }
}
