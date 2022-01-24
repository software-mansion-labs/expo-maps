protocol MapView: UIView {
  init()
  
  init?(coder: NSCoder)
  
  func setMapType(mapType: MapType) -> Void
  
  func setMarkers(markerObjects: [MarkerObject]) -> Void
}
