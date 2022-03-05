import MapKit

class AppleMapsMarkers: NSObject, Markers {

  private let mapView: MKMapView
  private var markers: [ExpoAppleMapsAnnotation] = []

  init(mapView: MKMapView) {
    self.mapView = mapView
    mapView.register(
      MKMarkerAnnotationView.self,
      forAnnotationViewWithReuseIdentifier: NSStringFromClass(ExpoAppleMapsAnnotation.self)
    )
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let marker = ExpoAppleMapsAnnotation(
        coordinate: CLLocationCoordinate2D(
          latitude: markerObject.latitude, longitude: markerObject.longitude))
      let iconURL = (markerObject.icon != nil) ? URL(fileURLWithPath: markerObject.icon!) : nil

      marker.title = markerObject.title
      marker.subtitle = markerObject.snippet
      marker.glyphImage = iconURL?.standardized.path
      marker.isDraggable = markerObject.draggable
      marker.markerTintColor = markerObject.defaultMarkerColor
      marker.centerOffsetX = markerObject.anchorU ?? 0
      marker.centerOffsetY = markerObject.anchorV ?? 0
      marker.alpha = markerObject.opacity

      mapView.addAnnotation(marker)
      markers.append(marker)
    }
  }

  internal func detachAndDeleteMarkers() {
    for marker in markers {
      mapView.removeAnnotation(marker)
    }
    markers = []
  }
}
