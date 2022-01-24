import MapKit

public final class AppleMapsView: UIView, ExpoMapView {
  private let mapView: MKMapView
  private let markers: AppleMapsMarkers
  
  init() {
    self.mapView = MKMapView()
    self.mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    self.markers = AppleMapsMarkers(mapView: self.mapView)

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
    self.markers.setMarkers(markerObjects: markerObjects)
  }
}
