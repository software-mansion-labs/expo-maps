import GoogleMaps
import GooglePlaces
import ExpoModulesCore

public final class GoogleMapsView: UIView, ExpoMapView {

  private let mapView: GMSMapView
  private let googleMapsViewDelegate: GoogleMapsViewDelegate
  private let controls: GoogleMapsControls
  private let markers: GoogleMapsMarkers
  private let clusters: GoogleMapsClusters
  private let googleMapsClusterManagerDelegate: GoogleMapsClusterManagerDelegate
  private let gestures: GoogleMapsGestures
  private let polygons: GoogleMapsPolygons
  private let polylines: GoogleMapsPolylines
  private let circles: GoogleMapsCircles
  private let kmls: GoogleMapsKMLs
  private let geojsons: GoogleMapsGeoJsons
  private let overlays: GoogleMapsOverlays
  private let places: GoogleMapsPlaces
  private var wasInitialCameraPositionSet = false
  private let heatmaps: GoogleMapsHeatmaps
  public var clickablePOIs = true
  private let googleMapsMarkersManager: GoogleMapsMarkersManager = GoogleMapsMarkersManager()

  // TODO: change to proper types from "[String: Any?]" when conversion from records gets implemented for iOS
  @Event var onMapLoaded: Callback<String?>
  @Event var onMapPress: Callback<[String: Any?]>
  @Event var onDoublePress: Callback<[String: Any?]>
  @Event var onLongPress: Callback<[String: Any?]>
  @Event var onRegionChange: Callback<[String: Any?]>
  @Event var onRegionChangeStarted: Callback<[String: Any?]>
  @Event var onRegionChangeComplete: Callback<[String: Any?]>
  @Event var onPoiClick: Callback<[String: Any?]>
  @Event var onMarkerPress: Callback<[String: Any?]>
  @Event var onMarkerDrag: Callback<[String: Any?]>
  @Event var onMarkerDragStarted: Callback<[String: Any?]>
  @Event var onMarkerDragComplete: Callback<[String: Any?]>
  @Event var onClusterPress: Callback<[String: Any?]>
  @Event var onLocationButtonPress: Callback<[String: Any?]>
  @Event var onLocationDotPress: Callback<[String: Any?]>
  @Event var onLocationChange: Callback<[String: Any?]>

  init(sendEvent: @escaping (String, [String: Any?]) -> Void) {
    // just for now we do authentication here
    // should be moved to module's function
    GoogleMapsView.initializeGoogleMapsServices()

    // random initial camera position
    // TODO: use prop as a source for initial camera position
    let camera = GMSCameraPosition.camera(withLatitude: 51.5, longitude: 0, zoom: 4.0)
    mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
    googleMapsViewDelegate = GoogleMapsViewDelegate(sendEvent: sendEvent, googleMapsMarkersManager: googleMapsMarkersManager)
    mapView.delegate = googleMapsViewDelegate
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    controls = GoogleMapsControls(mapView: mapView)
    markers = GoogleMapsMarkers(mapView: mapView, googleMapsMarkersManager: googleMapsMarkersManager)
    googleMapsClusterManagerDelegate = GoogleMapsClusterManagerDelegate(googleMapsMarkersManager: googleMapsMarkersManager)
    clusters = GoogleMapsClusters(mapView: mapView, googleMapsMarkersManager: googleMapsMarkersManager, googleMapsClusterManagerDelegate: googleMapsClusterManagerDelegate, googleMapsViewDelegate: googleMapsViewDelegate)
    gestures = GoogleMapsGestures(mapView: mapView)
    polygons = GoogleMapsPolygons(mapView: mapView)
    polylines = GoogleMapsPolylines(mapView: mapView)
    circles = GoogleMapsCircles(mapView: mapView)
    kmls = GoogleMapsKMLs(mapView: mapView)
    geojsons = GoogleMapsGeoJsons(mapView: mapView)
    overlays = GoogleMapsOverlays(mapView: mapView)
    heatmaps = GoogleMapsHeatmaps(mapView: mapView)
    places = GoogleMapsPlaces(mapView: mapView, markers: markers)

    super.init(frame: CGRect.zero)
    googleMapsViewDelegate.expoMapView = self
    googleMapsClusterManagerDelegate.setOnClusterPress(onClusterPress: onClusterPress)
    mapView.addObserver(googleMapsViewDelegate, forKeyPath: "myLocation", context: nil)
    addSubview(mapView)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // Allows the double tap to work

  public func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer,
                                _ otherGestureRecognizer: UIGestureRecognizer) -> Bool {
    true
  }

  private static func initializeGoogleMapsServices() {
    guard let path = Bundle.main.path(forResource: "Info", ofType: "plist") else {
      fatalError("Couldn't find file 'Info.plist'.")
    }
    let content = NSDictionary(contentsOfFile: path)
    guard let googleMapsApiKey = content?.object(forKey: "GoogleMapsApiKey") as? String else {
      fatalError("Couldn't find key 'GoogleMapsApiKey' in 'Info.plist'.")
    }
    GMSServices.provideAPIKey(googleMapsApiKey)
    GMSPlacesClient.provideAPIKey(googleMapsApiKey)
  }

  func fetchPlacesSearchCompletions(searchQueryFragment: String, promise: Promise) {
    places.fetchSearchCompletions(searchQueryFragment: searchQueryFragment, promise: promise)
  }

  func createPOISearchRequest(place: String) {
    places.createSearchRequest(place: place)
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

  func setHeatmaps(heatmapObjects: [HeatmapObject]) {
    heatmaps.setHeatmaps(heatmapObjects: heatmapObjects)
  }

  func setClickablePOIs(clickablePOIs: Bool) {
    self.clickablePOIs = clickablePOIs
  }
}
