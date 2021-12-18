import GoogleMaps

public final class GoogleMapsView: UIView, MapView {
  internal var mapView: UIView?
  internal var authenticated: Bool

  override public var bounds: CGRect {
    didSet {
      self.mapView?.frame = self.frame
    }
  }

  init() {
    self.authenticated = false
    super.init(frame: CGRect.zero)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func authenticateAndCreateMapView(apiKey: String) {
    if (!self.authenticated) {
      GMSServices.provideAPIKey(apiKey)
      self.authenticated = true

      // random initial camera position
      // TODO: use prop as a source for initial camera position
      let camera = GMSCameraPosition.camera(withLatitude: -33.86, longitude: 151.20, zoom: 6.0)
      self.mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
      self.addSubview(self.mapView!)
    }
  }
}
