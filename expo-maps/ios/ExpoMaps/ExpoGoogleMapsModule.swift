import ExpoModulesCore

public class ExpoGoogleMapsModule: Module {
  
  public func definition() -> ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        GoogleMapsView()
      }
      
      prop("enableRotateGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledRotateGestures(enabled: enable)
      }
      
      prop("enableScrollGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledScrollGestures(enabled: enable)
      }
      
      prop("enableTiltGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledTiltGestures(enabled: enable)
      }
      
      prop("enableZoomGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledZoomGestures(enabled: enable)
      }
      
      prop("mapType") { (view: GoogleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }
      
      prop("jsonStyleString") { (view: GoogleMapsView, jsonStyleString: String) in
        view.setMapStyle(jsonStyleString: jsonStyleString)
      }
      
      prop("markers") { (view: GoogleMapsView, markerObjects: [MarkerObject]) in
        view.setMarkers(markerObjects: markerObjects)
      }
      
      prop("polygons") { (view: GoogleMapsView, polygonObjects: [PolygonObject]) in
        view.setPolygons(polygonObjects: polygonObjects)
      }
      
      prop("polylines") { (view: GoogleMapsView, polylineObjects: [PolylineObject]) in
        view.setPolylines(polylineObjects: polylineObjects)
      }

      prop("circles") { (view: GoogleMapsView, circleObjects: [CircleObject]) in
        view.setCircles(circleObjects: circleObjects)
      }
    }
  }
}
