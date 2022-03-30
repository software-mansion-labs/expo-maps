import GoogleMaps
import GoogleMapsUtils

class GoogleMapsGeoJsons: GeoJsons {

  private let mapView: GMSMapView
  private var renderers: [GMUGeometryRenderer] = []

  init(mapView: GMSMapView) {
    self.mapView = mapView
  }

  func setGeoJsons(geoJsonObjects: [GeoJsonObject]) {
    deleteGeoJsons()
    for geoJsonObject in geoJsonObjects {
      let geoJsonParser = GMUGeoJSONParser(data: geoJsonObject.geoJsonString.data(using: .utf8)!)
      geoJsonParser.parse()

      let renderer = GMUGeometryRenderer(
        map: mapView,
        geometries: geoJsonParser.features
      )

      renderer.render()
      renderers.append(renderer)
    }
  }
  
  private func deleteGeoJsons() {
    for renderer in renderers {
      renderer.clear()
    }
    renderers = []
  }
}
