protocol ExpoMapView: UIView {
  init()
  init?(coder: NSCoder)

  func setMapType(mapType: MapType)
  func setMarkers(markerObjects: [MarkerObject])
  func setPolygons(polygonObjects: [PolygonObject])
  func setPolylines(polylineObjects: [PolylineObject])
  func setInitialCameraPosition(initialCameraPosition: CameraPosition)
  func setEnabledTraffic(enableTraffic: Bool)
  func setKMLs(kmlObjects: [KMLObject])
  func setGeoJsons(geoJsonObjects: [GeoJsonObject])
  func setOverlays(overlayObjects: [OverlayObject])
}
