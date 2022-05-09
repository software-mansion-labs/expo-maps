import MapKit

public final class AppleMapsView: UIView, ExpoMapView {
  private let mapView: MKMapView
  private let controls: AppleMapsControls
  private let delegate: AppleMapsDelegate
  private let markers: AppleMapsMarkers
  private let clusters: AppleMapsClusters
  private let gestures: AppleMapsGestures
  private let polygons: AppleMapsPolygons
  private let polylines: AppleMapsPolylines
  private let circles: AppleMapsCircles
  private let geoJsons: AppleMapsGeoJsons
  private let kmls: AppleMapsKMLs
  private var wasInitialCameraPositionSet = false

  init() {
    mapView = MKMapView()
    mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    delegate = AppleMapsDelegate()
    mapView.delegate = delegate
    controls = AppleMapsControls(mapView: mapView)
    markers = AppleMapsMarkers(mapView: mapView)
    clusters = AppleMapsClusters(mapView: mapView)
    gestures = AppleMapsGestures(mapView: mapView)
    polygons = AppleMapsPolygons(mapView: mapView)
    polylines = AppleMapsPolylines(mapView: mapView)
    circles = AppleMapsCircles(mapView: mapView)
    geoJsons = AppleMapsGeoJsons(mapView: mapView)
    kmls = AppleMapsKMLs(mapView: mapView, markers: markers, polylines: polylines, polygons: polygons)

    super.init(frame: CGRect.zero)
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
    var mapViewType: MKMapType
    switch mapType {
    case .hybrid:
      mapViewType = .hybrid
    case .satellite:
      mapViewType = .satellite
    case .normal, .terrain:
      mapViewType = .standard
    }
    mapView.mapType = mapViewType
  }

  func setMarkers(markerObjects: [MarkerObject]) {
    markers.setMarkers(markerObjects: markerObjects)
  }
  
  func setClusters(clusterObjects: [ClusterObject]) {
    delegate.setClusters(clusterObjects: clusterObjects)
    clusters.setClusters(clusterObjects: clusterObjects)
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
  
  func setInitialCameraPosition(initialCameraPosition: CameraPosition) {
    if (!wasInitialCameraPositionSet) {
      let camera = MKMapCamera(lookingAtCenter: CLLocationCoordinate2D(latitude: initialCameraPosition.latitude, longitude: initialCameraPosition.longitude), fromDistance: googleMapsZoomLevelToMeters(latitude: initialCameraPosition.latitude, zoom: initialCameraPosition.zoom), pitch: 0, heading: CLLocationDirection())
      mapView.setCamera(camera, animated: initialCameraPosition.animate)
      wasInitialCameraPositionSet = true
    }
  }
  
  func setEnabledTraffic(enableTraffic: Bool) {
    mapView.showsTraffic = enableTraffic
  }
  
  func setKMLs(kmlObjects: [KMLObject]) {
    kmls.setKMLs(kmlObjects: kmlObjects)
  }
  
  func setGeoJsons(geoJsonObjects: [GeoJsonObject]) {
    geoJsons.setGeoJsons(geoJsonObjects: geoJsonObjects)
  }
  
  // imitating Google Maps zoom level behaviour
  // based on https://gis.stackexchange.com/questions/7430/what-ratio-scales-do-google-maps-zoom-levels-correspond-to
  private func googleMapsZoomLevelToMeters(latitude: Double, zoom: Double) -> Double {
    let metersPerPixel = 156543.03392 * cos(latitude * Double.pi / 180) / pow(2, zoom - 1)
    return UIScreen.main.bounds.size.width * metersPerPixel
  }
}
