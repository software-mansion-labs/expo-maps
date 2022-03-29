protocol ExpoMapView: UIView {
  init()
  init?(coder: NSCoder)

  func setMapType(mapType: MapType)
  func setMarkers(markerObjects: [MarkerObject])
  func setPolygons(polygonObjects: [PolygonObject])
  func setPolylines(polylineObjects: [PolylineObject])
  func setCameraPosition(cameraPosition: CameraPosition)
  func setEnabledTraffic(enableTraffic: Bool)
  func setKMLs(kmlObjects: [KMLObject])
  func setGeoJsons(geoJsonObjects: [GeoJsonObject])
}
