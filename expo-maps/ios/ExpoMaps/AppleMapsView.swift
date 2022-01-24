import MapKit

public final class AppleMapsView: UIView {
  internal var mapView: MKMapView
  internal var markers: [MKPointAnnotation] = []

  init() {
    self.mapView = MKMapView()
    self.mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

    super.init(frame: CGRect.zero)
    self.addSubview(self.mapView)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func setMapType(mapType: MapType) -> Void {
    var mapViewType: MKMapType
    switch mapType {
    case .hybrid:
      mapViewType = .hybrid
    case .satellite:
      mapViewType = .satellite
    case .normal, .terrain:
      mapViewType = .standard
    }
    self.mapView.mapType = mapViewType
  }
  
  func setMarkers(markerObjects: [MarkerObject]) {
    self.detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let marker = MKPointAnnotation()
      marker.coordinate = CLLocationCoordinate2D(latitude: markerObject.latitude!, longitude: markerObject.longitude!)
      self.mapView.addAnnotation(marker)
      self.markers.append(marker)
    }
  }
  
  private func detachAndDeleteMarkers() -> Void {
    for marker in self.markers {
      self.mapView.removeAnnotation(marker)
    }
    self.markers = []
  }
}
