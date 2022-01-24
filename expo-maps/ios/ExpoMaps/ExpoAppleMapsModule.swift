import ExpoModulesCore


public class ExpoAppleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoAppleMaps")

    viewManager {
      view {
        AppleMapsView()
      }
      prop("mapType") { (view: AppleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }
      prop("markers") { (view: AppleMapsView, markerObjects: [MarkerObject]) in
        
      }
    }
  }
}
