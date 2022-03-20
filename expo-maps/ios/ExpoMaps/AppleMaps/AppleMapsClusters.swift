import MapKit

class AppleMapsClusters : Clusters {
  
  private let mapView: MKMapView
  private var clusterMarkers: [ExpoMKAnnotation] = []
  
  /*
   Two custer classes, which are used to display clusters on a map, are here registered in order to reuse their instances
   when user scrolls a map.
   */
  init(mapView: MKMapView) {
    self.mapView = mapView
    mapView.register(ExpoMKClusterImageAnnotationView.self, forAnnotationViewWithReuseIdentifier: "image_cluster")
    mapView.register(ExpoMKClusterColorAnnotationView.self, forAnnotationViewWithReuseIdentifier: "color_cluster")
  }
  
  func setClusters(clusterObjects: [ClusterObject]) {
    mapView.removeAnnotations(clusterMarkers)
    clusterMarkers = []
    
    for clusterObject in clusterObjects {
      for markerObject in clusterObject.markers {
        let marker = createAppleMarker(markerObject: markerObject)
        
        if (clusterObject.markers.count >= clusterObject.minimumClusterSize) {
          marker.clusterName = clusterObject.name
        }
        
        mapView.addAnnotation(marker)
        clusterMarkers.append(marker)
      }
    }
  }
}
