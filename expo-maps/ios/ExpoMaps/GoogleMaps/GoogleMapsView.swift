import GoogleMaps

public final class GoogleMapsView: UIView, ExpoMapView {

  private let mapView: GMSMapView
  private let markers: GoogleMapsMarkers
  private let gestures: GoogleMapsGestures
  private let polygons: GoogleMapsPolygons
  private let polylines: GoogleMapsPolylines
  private let controls: GoogleMapsControls

  init() {
    // just for now we do authentication here
    // should be moved to module's function
    GMSServices.provideAPIKey("AIzaSyDbgaRNTr3PhYdj_PL7jY_o9u3R08Gf8Ao")
    
    // random initial camera position
    // TODO: use prop as a source for initial camera position
    let camera = GMSCameraPosition.camera(withLatitude: -33.86, longitude: 151.20, zoom: 6.0)
    mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    markers = GoogleMapsMarkers(mapView: mapView)
    gestures = GoogleMapsGestures(mapView: mapView)
    polygons = GoogleMapsPolygons(mapView: mapView)
    polylines = GoogleMapsPolylines(mapView: mapView)
    controls = GoogleMapsControls(mapView: mapView)
    
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
    var mapViewType: GMSMapViewType
    switch mapType {
    case .hybrid:
      mapViewType = .hybrid
    case .satellite:
      mapViewType = .satellite
    case .terrain:
      mapViewType = .terrain
    case .normal:
      mapViewType = .normal
    }
    mapView.mapType = mapViewType
  }

  func setMapStyle(jsonStyleString: String) {
    if (jsonStyleString.count != 0) {
      do {
        mapView.mapStyle = try GMSMapStyle(jsonString: jsonStyleString)
      } catch {
        NSLog("One or more of the map styles failed to load. \(error)")
      }
    } else {
      mapView.mapStyle = nil
    }
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
