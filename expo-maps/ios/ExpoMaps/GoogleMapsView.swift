import GoogleMaps

public final class GoogleMapsView: UIView {
  internal var mapView: GMSMapView

  init() {
    // just for now we do authentication here
    // should be moved to module's function
    GMSServices.provideAPIKey("AIzaSyDbgaRNTr3PhYdj_PL7jY_o9u3R08Gf8Ao")
    
    // random initial camera position
    // TODO: use prop as a source for initial camera position
    let camera = GMSCameraPosition.camera(withLatitude: -33.86, longitude: 151.20, zoom: 6.0)
    self.mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
    self.mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    
    super.init(frame: CGRect.zero)
    self.addSubview(self.mapView)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  
  func setMapType(mapType: MapType) -> Void {
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
  
  func setMapStyle(jsonStyleString: String) -> Void {
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
}
