import GoogleMaps

public final class GoogleMapsView: UIView, ExpoMapView {

  private let mapView: GMSMapView
  private let delegate: GoogleMapsViewDelegate
  private let controls: GoogleMapsControls
  private let markers: GoogleMapsMarkers
  private let clusters: GoogleMapsClusters
  private let gestures: GoogleMapsGestures
  private let polygons: GoogleMapsPolygons
  private let polylines: GoogleMapsPolylines
  private let circles: GoogleMapsCircles
  private let kmls: GoogleMapsKMLs
  private let geojsons: GoogleMapsGeoJsons
  private let overlays: GoogleMapsOverlays
  private var wasInitialCameraPositionSet = false

  init() {
    // just for now we do authentication here
    // should be moved to module's function
    GMSServices.provideAPIKey("AIzaSyDbgaRNTr3PhYdj_PL7jY_o9u3R08Gf8Ao")

    // random initial camera position
    // TODO: use prop as a source for initial camera position
    let camera = GMSCameraPosition.camera(withLatitude: 51.5, longitude: 0, zoom: 4.0)
    mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
    delegate = GoogleMapsViewDelegate()
    mapView.delegate = delegate
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    controls = GoogleMapsControls(mapView: mapView)
    markers = GoogleMapsMarkers(mapView: mapView)
    clusters = GoogleMapsClusters(mapView: mapView)
    gestures = GoogleMapsGestures(mapView: mapView)
    polygons = GoogleMapsPolygons(mapView: mapView)
    polylines = GoogleMapsPolylines(mapView: mapView)
    circles = GoogleMapsCircles(mapView: mapView)
    kmls = GoogleMapsKMLs(mapView: mapView)
    geojsons = GoogleMapsGeoJsons(mapView: mapView)
    overlays = GoogleMapsOverlays(mapView: mapView)

    super.init(frame: CGRect.zero)
    delegate.expoMapView = self
    addSubview(mapView)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func setShowCompass(enable: Bool) {
    controls.setShowCompass(enable: enable)
  }

  func setShowMyLocationButton(enable: Bool) {
    controls.setShowMyLocationButton(enable: enable)
  }

  func setShowLevelPicker(enable: Bool) {
    controls.setShowLevelPicker(enable: enable)
  }

  func setEnabledRotateGestures(enabled: Bool) {
    gestures.setEnabledRotateGesture(enabled: enabled)
  }

  func setEnabledScrollGestures(enabled: Bool) {
    gestures.setEnabledScrollGesture(enabled: enabled)
  }

  func setEnabledTiltGestures(enabled: Bool) {
    gestures.setEnabledTiltGesture(enabled: enabled)
  }

  func setEnabledZoomGestures(enabled: Bool) {
    gestures.setEnabledZoomGesture(enabled: enabled)
  }

  func setMapType(mapType: MapType) {
    var mapViewType: GMSMapViewType
    switch mapType {
    case .hybrid:
      mapViewType = .hybrid
    case .satellite:
      mapViewType = .satellite
    case .terrain:
      mapViewType = .terrain
    case .normal:
      mapViewType = .normal
    }
    mapView.mapType = mapViewType
  }

  func setMapStyle(jsonStyleString: String) {
    if jsonStyleString.count != 0 {
      do {
        mapView.mapStyle = try GMSMapStyle(jsonString: jsonStyleString)
      } catch {
        NSLog("One or more of the map styles failed to load. \(error)")
      }
    } else {
      mapView.mapStyle = nil
    }
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    markers.setMarkers(markerObjects: markerObjects)
  }

  func setPolygons(polygonObjects: [PolygonObject]) {
    polygons.setPolygons(polygonObjects: polygonObjects)
  }

  func setPolylines(polylineObjects: [PolylineObject]) {
    polylines.setPolylines(polylineObjects: polylineObjects)
  }

  func setCircles(circleObjects: [CircleObject]) {
    circles.setCircles(circleObjects: circleObjects)
  }

  func updatePolylines() {
    polylines.updateStrokePatterns()
  }

  func updatePolygons() {
    polygons.updateStrokePatterns()
  }
  
  func setInitialCameraPosition(initialCameraPosition: CameraPosition) {
    if (!wasInitialCameraPositionSet) {
      let newCameraPosition = GMSCameraPosition(latitude: initialCameraPosition.latitude, longitude: initialCameraPosition.longitude, zoom: Float(initialCameraPosition.zoom))
      if (initialCameraPosition.animate) {
        mapView.animate(to: newCameraPosition)
      } else {
        mapView.camera = newCameraPosition
      }
      wasInitialCameraPositionSet = true
    }
  }
    
  func setClusters(clusterObjects: [ClusterObject]) {
    clusters.setClusters(clusterObjects: clusterObjects)
  }
  
  func setEnabledTraffic(enableTraffic: Bool) {
    mapView.isTrafficEnabled = enableTraffic
  }
  
  func setKMLs(kmlObjects: [KMLObject]) {
    kmls.setKMLs(kmlObjects: kmlObjects)
  }
  
  func setGeoJsons(geoJsonObjects: [GeoJsonObject]) {
    geojsons.setGeoJsons(geoJsonObjects: geoJsonObjects)
  }
  
  func setOverlays(overlayObjects: [OverlayObject]) {
    overlays.setOverlays(overlayObjects: overlayObjects)
  }
}
