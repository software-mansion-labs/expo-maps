import MapKit

public final class AppleMapsView: UIView, ExpoMapView {

  private let mapView: MKMapView
  private let delegate: MKMapViewDelegate
  private let markers: AppleMapsMarkers
  private let gestures: AppleMapsGestures
  private let polygons: AppleMapsPolygons
  private let polylines: AppleMapsPolylines

  init() {
    mapView = MKMapView()
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    delegate = AppleMapsViewDelegate()
    mapView.delegate = delegate
    markers = AppleMapsMarkers(mapView: mapView)
    gestures = AppleMapsGestures(mapView: mapView)
    polygons = AppleMapsPolygons(mapView: mapView)
    polylines = AppleMapsPolylines(mapView: mapView)

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
    self.mapView.mapType = mapViewType

  }

  func setShowCompassButton(enable: Bool) {
    self.mapView.showsCompass = enable
  }

  func setShowMyLocationButton(enable: Bool) {
    if (enable == true) {
      self.enableMyLocationButton()
    }
  }

  func setShowLevelPickerButton(enable: Bool) {
    //TODO: enable floor picker
  }

  private func enableMyLocationButton() {

    self.mapView.showsUserLocation = true
    let myLocationButton = MKUserTrackingButton(mapView: self.mapView)
    myLocationButton.layer.backgroundColor = UIColor(white: 1, alpha: 0.5).cgColor
    myLocationButton.layer.borderColor = UIColor.white.cgColor
    myLocationButton.layer.borderWidth = 1
    myLocationButton.layer.cornerRadius = 5
    myLocationButton.translatesAutoresizingMaskIntoConstraints = false
    self.mapView.addSubview(myLocationButton)

    NSLayoutConstraint.activate([
        myLocationButton.topAnchor.constraint(equalTo: self.mapView.topAnchor,
constant: 100),
        myLocationButton.trailingAnchor.constraint(equalTo:
self.mapView.trailingAnchor, constant: -10)
    ])
  }
