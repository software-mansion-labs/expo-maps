import MapKit

class AppleMapsMarkers: NSObject, Markers {

  private let mapView: MKMapView
  private var markers: [ExpoMKAnnotation] = []
  private var kmlMarkers: [ExpoMKAnnotation] = []
  private var poiMarkers: [ExpoMKAnnotation] = []
  
  /*
   Two marker classes, which are used to display markers on a map, are here registered in order to reuse their instances
   when user scrolls a map.
   */
  init(mapView: MKMapView) {
    self.mapView = mapView
    mapView.register(ExpoMKImageAnnotationView.self, forAnnotationViewWithReuseIdentifier: "image_marker")
    mapView.register(ExpoMKColorAnnotationView.self, forAnnotationViewWithReuseIdentifier: "color_marker")
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    detachAndDeleteMarkers()
    
    for markerObject in markerObjects {
      let marker = createAppleMarker(markerObject: markerObject)
      
      mapView.addAnnotation(marker)
      markers.append(marker)
    }
  }
  
  func setKMLMarkers(markerObjects: [MarkerObject]) {
    detachAndDeleteKMLMarkers()
    
    for markerObject in markerObjects {
      let marker = createAppleMarker(markerObject: markerObject)
      
      mapView.addAnnotation(marker)
      kmlMarkers.append(marker)
    }
  }

  func setPOIMarkers(markerObjects: [MarkerObject]) {
    detachAndDeletePOIMarkers()
    
    for markerObject in markerObjects {
      let marker = createAppleMarker(markerObject: markerObject)
      
      mapView.addAnnotation(marker)
      poiMarkers.append(marker)
    }
  }
  
  func setPOIMarkers(markerObjects: [MarkerObject]) {
    detachAndDeletePOIMarkers()
    
    for markerObject in markerObjects {
      let marker = createAppleMarker(markerObject: markerObject)
      
      mapView.addAnnotation(marker)
      poiMarkers.append(marker)
    }
  }
  
  internal func detachAndDeleteMarkers() {
    mapView.removeAnnotations(markers)
    markers = []
  }
  
  private func detachAndDeleteKMLMarkers() {
    mapView.removeAnnotations(kmlMarkers)
    kmlMarkers = []
  }
  
  func detachAndDeletePOIMarkers() {
    mapView.removeAnnotations(poiMarkers)
    poiMarkers = []
  }
}
