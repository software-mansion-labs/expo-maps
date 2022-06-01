import GoogleMaps

class GoogleMapsMarkers: Markers {

  private let mapView: GMSMapView
  private var markers: [GMSMarker] = []
  private var poiMarkers: [GMSMarker] = []

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
  
  func setPOIMarkers(markerObjects: [MarkerObject]) {
    detachAndDeletePOIMarkers()
    for markerObject in markerObjects {
      let marker: GMSMarker = createGoogleMarker(markerObject: markerObject)
      
      marker.map = mapView
      poiMarkers.append(marker)
    }
  }

  internal func detachAndDeleteMarkers() {
    for marker in markers {
      marker.map = nil
    }
    markers = []
  }
  
  func detachAndDeletePOIMarkers() {
    for marker in poiMarkers {
      marker.map = nil
    }
    poiMarkers = []
  }
}
