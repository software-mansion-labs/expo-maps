import MapKit

class AppleMapsMarkers: NSObject, Markers {
  private let mapView: MKMapView
  private let delegate: MKMapViewDelegate
  private var markers: [ExpoAppleMapsAnnotation] = []
  
  init(mapView: MKMapView) {
    self.mapView = mapView
    self.delegate = AppleMapsViewDelegate()
    self.mapView.delegate = delegate
    self.mapView.register(
      MKMarkerAnnotationView.self,
      forAnnotationViewWithReuseIdentifier: NSStringFromClass(ExpoAppleMapsAnnotation.self)
    )
  }
  
  func setMarkers(markerObjects: [MarkerObject]) {
    self.detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let marker = ExpoAppleMapsAnnotation(coordinate: CLLocationCoordinate2D(latitude: markerObject.latitude, longitude: markerObject.longitude))
      let iconURL = (markerObject.icon != nil) ? URL(fileURLWithPath: markerObject.icon!) : nil
      
      marker.title = markerObject.title
      marker.subtitle = markerObject.snippet
      marker.glyphImage = iconURL?.standardized.path
      marker.isDraggable = markerObject.draggable
      marker.markerTintColor = markerObject.defaultMarkerColor
      marker.centerOffsetX = markerObject.anchorU ?? 0
      marker.centerOffsetY = markerObject.anchorV ?? 0
      marker.alpha = markerObject.opacity
      
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
