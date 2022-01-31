import GoogleMaps
import CoreGraphics

class GoogleMapsMarkers: Markers {
  private let mapView: GMSMapView
  private var markers: [GMSMarker] = []
  
  init(mapView: GMSMapView) {
    self.mapView = mapView
  }
  
  func setMarkers(markerObjects: [MarkerObject]) {
    self.detachAndDeleteMarkers()
    for markerObject in markerObjects {
      let position = CLLocationCoordinate2D(latitude: markerObject.latitude, longitude: markerObject.longitude)
      let marker = GMSMarker(position: position)
      let iconURL = (markerObject.icon != nil) ? URL(fileURLWithPath: markerObject.icon!) : nil
      marker.map = self.mapView
      marker.title = markerObject.title
      marker.snippet = markerObject.snippet
      marker.isDraggable = markerObject.draggable
      marker.groundAnchor = CGPoint(x: markerObject.anchorU ?? 0.5, y: markerObject.anchorV ?? 1)
      marker.opacity = Float(markerObject.opacity)
      
      if (iconURL != nil) {
        marker.icon = UIImage(contentsOfFile: iconURL!.path)
      } else {
        let color = markerObject.defaultMarkerColor.truncatingRemainder(dividingBy: Resources.HUE_WHEEL_MAX_VALUE) / Resources.HUE_WHEEL_MAX_VALUE
        marker.icon = GMSMarker.markerImage(with: UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1))
      }
      
      self.markers.append(marker)
    }
  }
  
  internal func detachAndDeleteMarkers() {
    for marker in self.markers {
      marker.map = nil
    }
    self.markers = []
  }
}
