import GoogleMaps

class GoogleMapsPolygons: Polygons {
  private let mapView: GMSMapView
  private var polygons: [GMSPolygon] = []
  
  init(mapView: GMSMapView) {
    self.mapView = mapView
  }
  
  func setPolygons(polygonObjects: [PolygonObject]) {
    detachAndDeletePolygons()
    for polygonObject in polygonObjects {
      let path = GMSMutablePath()
      for point in polygonObject.points {
        path.add(CLLocationCoordinate2D(latitude: point.latitude, longitude: point.longitude))
      }
      let polygon = GMSPolygon(path: path)
      polygon.map = mapView
      polygons.append(polygon)
    }
  }
  
  internal func detachAndDeletePolygons() {
    for polygon in polygons {
      polygon.map = nil
    }
    polygons = []
  }
}
