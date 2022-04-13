import MapKit

class AppleMapsGeoJsons: GeoJsons {

  private let mapView: MKMapView
  private var annotations: [MKAnnotation] = []
  private var overlays: [MKOverlay] = []

  init(mapView: MKMapView) {
    self.mapView = mapView
  }

  func setGeoJsons(geoJsonObjects: [GeoJsonObject]) {
    deleteGeoJsons()
    if #available(iOS 13.0, *) {
      for geoJsonObject in geoJsonObjects {
        
        let appleMapsObjects = try! MKGeoJSONDecoder().decode(geoJsonObject.geoJsonString.data(using: .utf8)!) as! [MKGeoJSONFeature]
        
        for object in appleMapsObjects {
          let geometry = object.geometry.first
          if let polygon = geometry as? MKPolygon {
            let expoPolygon = ExpoMKPolygon(points: polygon.points(), count: polygon.pointCount)
            mapView.addOverlay(expoPolygon)
            overlays.append(expoPolygon)
          }
          if let polyline = geometry as? MKPolyline {
            let expoPolyline = ExpoMKPolyline(points: polyline.points(), count: polyline.pointCount)
            mapView.addOverlay(expoPolyline)
            overlays.append(expoPolyline)
          }
          if let marker = geometry as? MKPointAnnotation {
            mapView.addAnnotation(marker)
            annotations.append(marker)
          }
        }
      }
    } else {
      // Fallback on earlier versions
    }
  }
  
  func deleteGeoJsons() {
    mapView.removeAnnotations(annotations)
    mapView.removeOverlays(overlays)
  }
}

