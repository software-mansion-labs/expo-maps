protocol ExpoMapView: UIView {
  init()
  
  init?(coder: NSCoder)
  
  func setMapType(mapType: MapType)
  
  func setMarkers(markerObjects: [MarkerObject])
}
