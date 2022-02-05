import ExpoModulesCore


public class ExpoAppleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoAppleMaps")

    viewManager {
      view {
        AppleMapsView()
      }

      prop("enableRotateGestures") { (view: AppleMapsView, enable: Bool) in
          view.setEnabledRotateGestures(enabled: enable)
      }

      prop("enableScrollGestures") { (view: AppleMapsView, enable: Bool) in
          view.setEnabledScrollGestures(enabled: enable)
      }

      prop("enableTiltGestures") { (view: AppleMapsView, enable: Bool) in
          view.setEnabledTiltGestures(enabled: enable)
      }
      
      prop("enableZoomGestures") { (view: AppleMapsView, enable: Bool) in
          view.setEnabledZoomGestures(enabled: enable)
      }
      
      prop("mapType") { (view: AppleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }
      
      prop("markers") { (view: AppleMapsView, markerObjects: [MarkerObject]) in
        view.setMarkers(markerObjects: markerObjects)
      }
      
      prop("polygons") { (view: AppleMapsView, polygonObjects: [PolygonObject]) in
        view.setPolygons(polygonObjects: polygonObjects)
      }
    }
  }
}
