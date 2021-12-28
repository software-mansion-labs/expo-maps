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
  
  func mapType(mapTypeName: String) -> Void {
    var mapViewType: GMSMapViewType
    switch mapTypeName {
    case "hybrid":
      mapViewType = .hybrid
    case "satelite":
      mapViewType = .satellite
    case "terain":
      mapViewType = .terrain
    default:
      mapViewType = .normal
    }
    self.mapView.mapType = mapViewType
  }
}
