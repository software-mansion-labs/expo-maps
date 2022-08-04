import GoogleMaps
import GoogleMapsUtils
import ExpoModulesCore

class GoogleMapsViewDelegate: NSObject, GMSMapViewDelegate {
  public var expoMapView: GoogleMapsView?
  private var zoom: Float = 0.0
  public let infoMarker = GMSMarker()
  private let sendEvent: (String, [String: Any?]) -> Void
  private let googleMapsMarkersManager: GoogleMapsMarkersManager
  private var mapInitialized: Bool = false
  private var mapInitialLoadComplete:Bool = false
  
  init(sendEvent: @escaping (String, [String: Any?]) -> Void, googleMapsMarkersManager: GoogleMapsMarkersManager) {
    self.sendEvent = sendEvent
    self.googleMapsMarkersManager = googleMapsMarkersManager
    infoMarker.opacity = 0
    super.init()
  }

  func mapView(_ mapView: GMSMapView, didTapAt coordinate: CLLocationCoordinate2D) {
    expoMapView?.onMapClick(LatLngRecord(coordinate: coordinate).toDictionary())
  }
  
  func mapViewDidStartTileRendering(_ mapView: GMSMapView) {
    if (!mapInitialized){
      expoMapView?.onMapReady("")
      mapInitialized = true
    }
  }

  func mapViewDidFinishTileRendering(_ mapView: GMSMapView) {
    if (!mapInitialLoadComplete){
      expoMapView?.onMapLoaded("")
      mapInitialLoadComplete = true
    }
  }

  func mapView(_ mapView: GMSMapView, willMove: Bool) {
    expoMapView?.onRegionChangeStarted(CameraPositionRecord(cameraPosition: mapView.camera).toDictionary())
  }

  func mapView(_ mapView: GMSMapView, didChange position: GMSCameraPosition) {
    if expoMapView == nil { return }
    if zoom != position.zoom {
      expoMapView!.updatePolylines()
      expoMapView!.updatePolygons()
    }
    expoMapView?.onRegionChange(CameraPositionRecord(cameraPosition: mapView.camera).toDictionary())
  }
  
  func mapView(_ mapView: GMSMapView, idleAt position: GMSCameraPosition) {
    expoMapView?.onRegionChangeComplete(CameraPositionRecord(cameraPosition: mapView.camera).toDictionary())
  }
  
  func mapView(_ mapView: GMSMapView, didTap marker: GMSMarker) -> Bool {
    if let id = googleMapsMarkersManager.getMarkerId(marker: marker) {
      sendEvent(MapEventsNames.ON_MARKER_CLICK_EVENT.rawValue, createMarkerClickEventContent(id: id))
    } else if let id = googleMapsMarkersManager.getClusterItemId(clusterItem: marker) {
      sendEvent(MapEventsNames.ON_MARKER_CLICK_EVENT.rawValue, createMarkerClickEventContent(id: id))
    }
    return false
  }
  
  func mapView(_ mapView: GMSMapView, didBeginDragging marker: GMSMarker) {
    if let id = googleMapsMarkersManager.getMarkerId(marker: marker) {
      sendEvent(MapEventsNames.ON_MARKER_DRAG_STARTED_EVENT.rawValue, createMarkerDragStartedEventContent(id: id))
    }
  }
  
  func mapView(_ mapView: GMSMapView, didEndDragging marker: GMSMarker) {
    if let id = googleMapsMarkersManager.getMarkerId(marker: marker) {
      sendEvent(
              MapEventsNames.ON_MARKER_DRAG_ENDED_EVENT.rawValue,
              createMarkerDragEndedEventContent(
                      id: id,
                      latitude: marker.position.latitude,
                      longitude: marker.position.longitude)
      )
    }
  }

  func mapView(
    _ mapView: GMSMapView,
    didTapPOIWithPlaceID placeId: String,
    name: String,
    location: CLLocationCoordinate2D
  ) {
    if (expoMapView!.clickablePOIs) {
      infoMarker.position = location
      infoMarker.title = name
      infoMarker.map = mapView
      mapView.selectedMarker = infoMarker
    }
    expoMapView?.onPoiClick(PointOfInterestRecord(placeId: placeId, name: name, location: location).toDictionary())
  }
}
