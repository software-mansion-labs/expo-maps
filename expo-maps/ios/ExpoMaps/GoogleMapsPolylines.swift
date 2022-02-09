import GoogleMaps

class GoogleMapsPolylines: Polylines {
  private let mapView: GMSMapView
  private var polylines: [GMSPolyline] = []
  
  init(mapView: GMSMapView) {
    self.mapView = mapView
  }
  
  func setPolylines(polylineObjects: [PolylineObject]) {
    detachAndDeletePolylines()
    for polylineObject in polylineObjects {
      let path = GMSMutablePath()
      for point in polylineObject.points {
        path.add(CLLocationCoordinate2D(latitude: point.latitude, longitude: point.longitude))
      }
      let polyline = GMSPolyline(path: path)
      polyline.map = mapView
      polylines.append(polyline)
    }
  }
  
  internal func detachAndDeletePolylines() {
    for polyline in polylines {
      polyline.map = nil
    }
    polylines = []
  }
}
