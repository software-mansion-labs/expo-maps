import MapKit

class AppleMapsPolygons: Polygons {
  private let mapView: MKMapView
  private var polygons: [MKPolygon] = []
  
  init(mapView: MKMapView) {
    self.mapView = mapView
  }
  
  func setPolygons(polygonObjects: [PolygonObject]) {
    detachAndDeletePolygons()
    for polygonObject in polygonObjects {
      var overlayPoints: [CLLocationCoordinate2D] = []
      for point in polygonObject.points {
        overlayPoints.append(CLLocationCoordinate2D(latitude: point.latitude, longitude: point.longitude))
      }
      let polygon = MKPolygon(coordinates: &overlayPoints, count: overlayPoints.count)
      let polygonRenderer = MKPolygonRenderer(polygon: polygon)
      polygonRenderer.fillColor = UIColor.red
      mapView.addOverlay(polygon)
      polygons.append(polygon)
    }
  }
  
  internal func detachAndDeletePolygons() {
    for polygon in polygons {
      self.mapView.removeOverlay(polygon)
    }
    polygons = []
  }
}
