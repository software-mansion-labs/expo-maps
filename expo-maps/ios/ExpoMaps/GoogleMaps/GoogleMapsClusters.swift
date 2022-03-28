import GoogleMaps
import GoogleMapsUtils

class GoogleMapsClusters : Clusters {
  
  private var clusters: [GMUClusterManager] = []
  private var clusterRenderersDelegates: [ExpoClusterRendererDelegate] = []
  private let mapView: GMSMapView
  
  init(mapView: GMSMapView) {
    self.mapView = mapView
  }
  
  func setClusters(clusterObjects: [ClusterObject]) {
    for cluster in clusters {
      cluster.clearItems()
      cluster.cluster()
    }
    
    clusters.removeAll()
    
    for clusterObject in clusterObjects {
      let color = clusterObject.color.truncatingRemainder(dividingBy: Resources.HUE_WHEEL_MAX_VALUE) / Resources.HUE_WHEEL_MAX_VALUE
      
      // Cluster color has to be set in regard to number of clustered markers
      let iconGenerator = GMUDefaultClusterIconGenerator(
        buckets: [5, 10, 50, 100, 1000],
        backgroundColors: [
          UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1),
          UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1),
          UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1),
          UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1),
          UIColor(hue: color, saturation: 1, brightness: 1, alpha: 1),
        ]
      )
      let algorithm = GMUNonHierarchicalDistanceBasedAlgorithm()
      let renderer = ExpoClusterRenderer(minimumClusterSize: clusterObject.minimumClusterSize, mapView: mapView, clusterIconGenerator: iconGenerator)
      let rendererDelegate = ExpoClusterRendererDelegate(
        title: clusterObject.markerTitle,
        snippet: clusterObject.markerSnippet,
        icon: clusterObject.icon,
        color: clusterObject.color,
        opacity: clusterObject.opacity
      )
      renderer.delegate = rendererDelegate
      let clusterManager = GMUClusterManager(map: mapView, algorithm: algorithm, renderer: renderer)

      for markerObject in clusterObject.markers {
        clusterManager.add(createGoogleMarker(markerObject: markerObject))
        clusterManager.cluster()
      }
      
      clusters.append(clusterManager)
      clusterRenderersDelegates.append(rendererDelegate)
    }
  }
}

class ExpoClusterRendererDelegate : NSObject, GMUClusterRendererDelegate {
  
  private let title: String?
  private let snippet: String?
  private let icon: String?
  private let color: Double
  private let opacity: Double
  
  init(title: String?, snippet: String?, icon: String?, color: Double, opacity: Double) {
    self.title = title
    self.snippet = snippet
    self.icon = icon
    self.color = color
    self.opacity = opacity
  }

  func renderer(_ renderer: GMUClusterRenderer, willRenderMarker marker: GMSMarker) {
    if (marker.userData is GMUCluster) {
      let iconURL = (icon != nil) ? URL(fileURLWithPath: icon!) : nil
      marker.title = title
      marker.snippet = snippet
      marker.opacity = Float(opacity)
      
      if (iconURL != nil) {
        marker.icon = UIImage(contentsOfFile: iconURL!.standardized.path)
      }
    }
  }
}

class ExpoClusterRenderer : GMUDefaultClusterRenderer {
  
  init(minimumClusterSize: Int, mapView: GMSMapView, clusterIconGenerator: GMUClusterIconGenerator) {
    super.init(mapView: mapView, clusterIconGenerator: clusterIconGenerator)
    self.minimumClusterSize = UInt(minimumClusterSize)
  }
}
