import MapKit

public final class AppleMapsView: UIView {
  internal var mapView: MKMapView

  init() {
    self.mapView = MKMapView()
    self.mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    
    super.init(frame: CGRect.zero)
    self.addSubview(self.mapView)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
