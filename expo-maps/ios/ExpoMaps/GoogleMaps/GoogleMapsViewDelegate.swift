import Foundation
import GoogleMaps

class GoogleMapsViewDelegate: UIViewController, GMSMapViewDelegate {
  public var expoMapView: GoogleMapsView?
  private var zoom: Float = 0.0

  init() {
    super.init(nibName: nil, bundle: nil)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func mapView(_ mapView: GMSMapView, willMove: Bool) {
    zoom = mapView.camera.zoom
  }

  func mapView(_ mapView: GMSMapView, didChange position: GMSCameraPosition) {
    if expoMapView == nil { return }
    if zoom != position.zoom {
      expoMapView!.updatePolylines()
      expoMapView!.updatePolygons()
    }
  }
}
