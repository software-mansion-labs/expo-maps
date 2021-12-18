protocol MapView: UIView {
  var mapView: UIView? { get }
  var authenticated: Bool { get }

  init()

  func authenticateAndCreateMapView(apiKey: String)
}
