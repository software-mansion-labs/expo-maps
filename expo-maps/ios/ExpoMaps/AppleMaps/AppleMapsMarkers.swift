import MapKit

class AppleMapsMarkers: NSObject, Markers {

  private let mapView: MKMapView
  private var markers: [ExpoMKAnnotation] = []
  
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
  
  private func detachAndDeleteMarkers() {
    mapView.removeAnnotations(markers)
    markers = []
  }
}
