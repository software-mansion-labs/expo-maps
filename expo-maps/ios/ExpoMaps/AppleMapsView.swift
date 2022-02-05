import MapKit

public final class AppleMapsView: UIView, ExpoMapView {
  private let mapView: MKMapView
  private let markers: AppleMapsMarkers
  private let gestures: AppleMapsGestures
  private let polygons: AppleMapsPolygons
  
  init() {
    mapView = MKMapView()
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    markers = AppleMapsMarkers(mapView: self.mapView)
    gestures = AppleMapsGestures(mapView: self.mapView)
    polygons = AppleMapsPolygons(mapView: self.mapView)

    super.init(frame: CGRect.zero)
    self.addSubview(self.mapView)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func setEnabledRotateGestures(enabled: Bool) {
    gestures.setEnabledRotateGesture(enabled: enabled)
  }

  func setEnabledScrollGestures(enabled: Bool) {
    gestures.setEnabledScrollGesture(enabled: enabled)
  }

  func setEnabledTiltGestures(enabled: Bool) {
    gestures.setEnabledTiltGesture(enabled: enabled)
  }

  func setEnabledZoomGestures(enabled: Bool) {
    gestures.setEnabledZoomGesture(enabled: enabled)
  }
  
  func setMapType(mapType: MapType) {
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
  
  func setPolygons(polygonObjects: [PolygonObject]) {
    self.polygons.setPolygons(polygonObjects: polygonObjects)
  }
}
