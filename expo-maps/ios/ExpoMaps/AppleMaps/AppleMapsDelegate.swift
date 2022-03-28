import MapKit

class AppleMapsDelegate : NSObject, MKMapViewDelegate {
  
  // Dictionary which holds cluster names connected with clusters appearance data
  private var clusterObjects: [String : ClusterObject] = [:]
  
  func setClusters(clusterObjects: [ClusterObject]) {
    self.clusterObjects = [:]
    for clusterObject in clusterObjects {
      self.clusterObjects[clusterObject.name] = clusterObject
    }
  }
  
  func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
    switch overlay {
    case let polygon as ExpoMKPolygon:
      let renderer = MKPolygonRenderer(overlay: polygon)
      renderer.fillColor = polygon.fillColor
      renderer.strokeColor = polygon.strokeColor
      renderer.lineWidth = CGFloat(polygon.strokeWidth)
      if polygon.strokePattern != nil { renderer.lineDashPattern = polygon.strokePattern }
      renderer.lineJoin = polygon.jointType
      return renderer
    case let polyline as ExpoMKPolyline:
      let renderer = MKPolylineRenderer(overlay: polyline)
      renderer.strokeColor = polyline.color
      renderer.lineWidth = CGFloat(polyline.width)
      if polyline.pattern != nil { renderer.lineDashPattern = polyline.pattern }
      renderer.lineJoin = polyline.jointType
      renderer.lineCap = polyline.capType
      return renderer
    case let circle as ExpoMKCircle:
      let renderer = MKCircleRenderer(overlay: circle)
      renderer.fillColor = circle.fillColor
      renderer.strokeColor = circle.strokeColor
      renderer.lineWidth = CGFloat(circle.strokeWidth)
      return renderer
    default:
      return MKOverlayRenderer()
    }
  }
  
  /*
   annotation can be one of four possible MKAnnotation subclasses, for each of them queue is checked if it contains
   the particular instance. If so, its fields are set, otherwise new instance is created.
   */
  func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
    if let annotation = annotation as? ExpoMKImageAnnotation {
      let view = mapView.dequeueReusableAnnotationView(withIdentifier: "image_marker")

      if let markerAnnotationView = view as? ExpoMKImageAnnotationView {
        markerAnnotationView.image = UIImage(contentsOfFile: annotation.icon)
        markerAnnotationView.isDraggable = annotation.isDraggable
        markerAnnotationView.centerOffset = CGPoint(x: annotation.centerOffsetX, y: annotation.centerOffsetY)
        markerAnnotationView.alpha = annotation.alpha
        markerAnnotationView.clusteringIdentifier = annotation.clusterName

        return markerAnnotationView
      } else {
        return ExpoMKImageAnnotationView(annotation: annotation, reuseIdentifier: "image_marker")
      }
    } else if let annotation = annotation as? ExpoMKColorAnnotation {
      let view = mapView.dequeueReusableAnnotationView(withIdentifier: "color_marker")
      
      if let markerAnnotationView = view as? ExpoMKColorAnnotationView {
        markerAnnotationView.markerTintColor = UIColor(hue: annotation.color, saturation: 1, brightness: 1, alpha: 1)
        markerAnnotationView.isDraggable = annotation.isDraggable
        markerAnnotationView.centerOffset = CGPoint(x: annotation.centerOffsetX, y: annotation.centerOffsetY)
        markerAnnotationView.alpha = annotation.alpha
        markerAnnotationView.clusteringIdentifier = annotation.clusterName
        
        return markerAnnotationView
      } else {
        return ExpoMKColorAnnotationView(annotation: annotation, reuseIdentifier: "color_marker")
      }
    } else if let annotation = annotation as? ExpoMKClusterImageAnnotation {
      let view = mapView.dequeueReusableAnnotationView(withIdentifier: "image_cluster")
      
      if let clusterAnnotationView = view as? ExpoMKClusterImageAnnotationView {
        clusterAnnotationView.image = UIImage(contentsOfFile: annotation.icon)
        clusterAnnotationView.alpha = annotation.alpha
        
        return clusterAnnotationView
      } else {
        return ExpoMKClusterImageAnnotationView(annotation: annotation, reuseIdentifier: "image_cluster")
      }
    } else if let annotation = annotation as? ExpoMKClusterColorAnnotation {
      let view = mapView.dequeueReusableAnnotationView(withIdentifier: "color_cluster")
      
      if let clusterAnnotationView = view as? ExpoMKClusterColorAnnotationView {
        clusterAnnotationView.markerTintColor = UIColor(hue: annotation.color, saturation: 1, brightness: 1, alpha: 1)
        clusterAnnotationView.alpha = annotation.alpha
        
        return clusterAnnotationView
      } else {
        return ExpoMKClusterColorAnnotationView(annotation: annotation, reuseIdentifier: "color_cluster")
      }
    } else {
      return nil
    }
  }
  
  /*
   Depending on memberAnnotation's clusterName and data paired with the name in clusterObjects dictionary
   ExpoMKClusterImageAnnotation or ExpoMKClusterColorAnnotation is created.
   */
  func mapView(_ mapView: MKMapView, clusterAnnotationForMemberAnnotations memberAnnotations: [MKAnnotation]) -> MKClusterAnnotation {
    if let expoAnnotation = memberAnnotations.first as? ExpoMKAnnotation {
      let clusterObject = clusterObjects[expoAnnotation.clusterName!]!

      let iconURL = (clusterObject.icon != nil) ? URL(fileURLWithPath: clusterObject.icon!) : nil
      
      if (iconURL != nil) {
        let clusterAnnotation = ExpoMKClusterImageAnnotation(memberAnnotations: memberAnnotations)
        clusterAnnotation.icon = iconURL!.standardized.path
        clusterAnnotation.minimumClusterSize = clusterObject.minimumClusterSize
        clusterAnnotation.title = clusterObject.markerTitle
        clusterAnnotation.subtitle = clusterObject.markerSnippet
        clusterAnnotation.alpha = clusterObject.opacity
        
        return clusterAnnotation
      } else {
        let clusterAnnotation = ExpoMKClusterColorAnnotation(memberAnnotations: memberAnnotations)
        let color = clusterObject.color.truncatingRemainder(dividingBy: Resources.HUE_WHEEL_MAX_VALUE) / Resources.HUE_WHEEL_MAX_VALUE
        clusterAnnotation.color = color
        clusterAnnotation.minimumClusterSize = clusterObject.minimumClusterSize
        clusterAnnotation.title = clusterObject.markerTitle
        clusterAnnotation.subtitle = clusterObject.markerSnippet
        clusterAnnotation.alpha = clusterObject.opacity
        
        return clusterAnnotation
      }
    }

    return ExpoMKClusterColorAnnotation(memberAnnotations: memberAnnotations)
  }
}
