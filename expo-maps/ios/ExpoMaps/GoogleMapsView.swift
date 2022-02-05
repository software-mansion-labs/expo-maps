import GoogleMaps

public final class GoogleMapsView: UIView, ExpoMapView {
  private let mapView: GMSMapView
  private let gestures: GoogleMapsGestures
  private let markers: GoogleMapsMarkers
  private let polygons: GoogleMapsPolygons

  init() {
    // just for now we do authentication here
    // should be moved to module's function
    GMSServices.provideAPIKey("AIzaSyDbgaRNTr3PhYdj_PL7jY_o9u3R08Gf8Ao")
    
    // random initial camera position
    // TODO: use prop as a source for initial camera position
    let camera = GMSCameraPosition.camera(withLatitude: -33.86, longitude: 151.20, zoom: 6.0)
    self.mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
    self.mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    self.markers = GoogleMapsMarkers(mapView: self.mapView)
    self.gestures = GoogleMapsGestures(mapView: self.mapView)
    self.polygons = GoogleMapsPolygons(mapView: self.mapView)
    
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
    self.mapView.mapType = mapViewType
  }
  
  func setMapStyle(jsonStyleString: String) {
    if (jsonStyleString.count != 0) {
      do {
        self.mapView.mapStyle = try GMSMapStyle(jsonString: jsonStyleString)
      } catch {
        NSLog("One or more of the map styles failed to load. \(error)")
      }
    } else {
      self.mapView.mapStyle = nil
    }
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    self.markers.setMarkers(markerObjects: markerObjects)
  }
  
  func setPolygons(polygonObjects: [PolygonObject]) {
    self.polygons.setPolygons(polygonObjects: polygonObjects)
  }
}
