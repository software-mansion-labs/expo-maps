import GoogleMaps
import GoogleMapsUtils

class GoogleMapsViewDelegate: NSObject, GMSMapViewDelegate {
  
  public var expoMapView: GoogleMapsView?
  private var zoom: Float = 0.0
  private let sendEvent: (String, [String: Any?]) -> Void
  private let googleMapsMarkersManager: GoogleMapsMarkersManager
  
  init(sendEvent: @escaping (String, [String: Any?]) -> Void, googleMapsMarkersManager: GoogleMapsMarkersManager) {
    self.sendEvent = sendEvent
    self.googleMapsMarkersManager = googleMapsMarkersManager
    super.init()
  }

  func mapView(_ mapView: GMSMapView, willMove: Bool) {
    zoom = mapView.camera.zoom
    sendEvent(MapEventsNames.ON_CAMERA_MOVE_STARTED_EVENT.rawValue, createCameraEventContent(latitude: mapView.camera.target.latitude, longitude: mapView.camera.target.longitude))
  }

  func mapView(_ mapView: GMSMapView, didChange position: GMSCameraPosition) {
    if expoMapView == nil { return }
    if zoom != position.zoom {
      expoMapView!.updatePolylines()
      expoMapView!.updatePolygons()
    }
  }
  
  func mapView(_ mapView: GMSMapView, idleAt position: GMSCameraPosition) {
    sendEvent(MapEventsNames.ON_CAMERA_MOVE_ENDED_EVENT.rawValue, createCameraEventContent(latitude: position.target.latitude, longitude: position.target.longitude))
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
      sendEvent(MapEventsNames.ON_MARKER_DRAG_ENDED_EVENT.rawValue, createMarkerDragEndedEventContent(id: id, latitude: marker.position.latitude, longitude: marker.position.longitude))
    }
  }
}
