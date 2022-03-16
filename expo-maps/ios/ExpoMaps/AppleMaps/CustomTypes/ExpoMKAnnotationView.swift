import MapKit

class ExpoMKColorAnnotationView : MKMarkerAnnotationView {
  
  override init(annotation: MKAnnotation?, reuseIdentifier: String?) {
    super.init(annotation: annotation, reuseIdentifier: reuseIdentifier)
    
    displayPriority = .required
  }
  
  init(annotation: ExpoMKColorAnnotation, reuseIdentifier: String?) {
    super.init(annotation: annotation, reuseIdentifier: reuseIdentifier)
    
    displayPriority = .required
    isDraggable = annotation.isDraggable
    centerOffset = CGPoint(x: annotation.centerOffsetX, y: annotation.centerOffsetY)
    alpha = annotation.alpha
    markerTintColor = UIColor(hue: annotation.color, saturation: 1, brightness: 1, alpha: 1)
    clusteringIdentifier = annotation.clusterName
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}

class ExpoMKImageAnnotationView : MKAnnotationView {
  
  override init(annotation: MKAnnotation?, reuseIdentifier: String?) {
    super.init(annotation: annotation, reuseIdentifier: reuseIdentifier)
    
    displayPriority = .required
    canShowCallout = true
    isEnabled = true
  }
  
  init(annotation: ExpoMKImageAnnotation, reuseIdentifier: String?) {
    super.init(annotation: annotation, reuseIdentifier: reuseIdentifier)
    
    displayPriority = .required
    canShowCallout = true
    isEnabled = true
    isDraggable = annotation.isDraggable
    centerOffset = CGPoint(x: annotation.centerOffsetX, y: annotation.centerOffsetY)
    alpha = annotation.alpha
    image = UIImage(contentsOfFile: annotation.icon)
    clusteringIdentifier = annotation.clusterName
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
