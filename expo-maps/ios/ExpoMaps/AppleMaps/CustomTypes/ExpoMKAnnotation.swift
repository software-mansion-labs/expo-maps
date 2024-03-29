import MapKit

open class ExpoMKAnnotation : NSObject, MKAnnotation {
    
  // This property must be key-value observable, which the `@objc dynamic` attributes provide.
  @objc public dynamic var coordinate: CLLocationCoordinate2D
  
  public var title: String? = nil
  
  public var subtitle: String? = nil
  
  var id: String? = nil
  
  var isDraggable: Bool = false
  
  var centerOffsetX: Double = 0
  
  var centerOffsetY: Double = 0
  
  var alpha: Double = 1
  
  var clusterName: String? = nil
    
  init(coordinate: CLLocationCoordinate2D) {
    self.coordinate = coordinate
    super.init()
  }
}

class ExpoMKImageAnnotation : ExpoMKAnnotation {
  
  var icon: String = ""
}

class ExpoMKColorAnnotation : ExpoMKAnnotation {
  
  var color: Double = 0
}
