import GoogleMaps
import GoogleMapsUtils

class GoogleMapsClusterManagerDelegate: NSObject, GMUClusterManagerDelegate {
  private let sendEvent: (String, [String: Any?]) -> Void
  private let googleMapsMarkersManager: GoogleMapsMarkersManager
  
  init(sendEvent: @escaping (String, [String: Any?]) -> Void, googleMapsMarkersManager: GoogleMapsMarkersManager) {
    self.sendEvent = sendEvent
    self.googleMapsMarkersManager = googleMapsMarkersManager
    super.init()
  }
  
  func clusterManager(_ clusterManager: GMUClusterManager, didTap cluster: GMUCluster) -> Bool {
    if let id = googleMapsMarkersManager.getClusterId(cluster: clusterManager) {
      sendEvent(MapEventsNames.ON_MARKER_CLICK_EVENT.rawValue, createMarkerClickEventContent(id: id))
    }
    return false
  }
}
