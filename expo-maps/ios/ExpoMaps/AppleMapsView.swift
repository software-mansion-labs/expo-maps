import MapKit

public final class AppleMapsView: UIView, ExpoMapView {

  private let mapView: MKMapView
  private let delegate: MKMapViewDelegate
  private let markers: AppleMapsMarkers
  private let gestures: AppleMapsGestures
  private let polygons: AppleMapsPolygons
  private let polylines: AppleMapsPolylines
  private let controls: AppleMapsControls

  init() {
    mapView = MKMapView()
    mapView.camera = MKMapCamera(lookingAtCenter: CLLocationCoordinate2D(latitude: 51.5, longitude: 0), fromDistance: CLLocationDistance(5000000), pitch: 0, heading: CLLocationDirection())
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    delegate = AppleMapsViewDelegate()
    mapView.delegate = delegate
    markers = AppleMapsMarkers(mapView: mapView)
    gestures = AppleMapsGestures(mapView: mapView)
    polygons = AppleMapsPolygons(mapView: mapView)
    polylines = AppleMapsPolylines(mapView: mapView)
    controls = AppleMapsControls(mapView: mapView)

    super.init(frame: CGRect.zero)
    addSubview(mapView)
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
    mapView.mapType = mapViewType
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    markers.setMarkers(markerObjects: markerObjects)
  }

  func setPolygons(polygonObjects: [PolygonObject]) {
    polygons.setPolygons(polygonObjects: polygonObjects)
  }

  func setPolylines(polylineObjects: [PolylineObject]) {
    polylines.setPolylines(polylineObjects: polylineObjects)
  }

  func setShowCompass(enable: Bool) {
    controls.setShowCompass(enable: enable)
  }

  func setShowMyLocationButton(enable: Bool) {
    controls.setShowMyLocationButton(enable: enable)
  }
    
  func setShowLevelPicker(enable: Bool) {
    controls.setShowLevelPicker(enable: enable)
  }
}
