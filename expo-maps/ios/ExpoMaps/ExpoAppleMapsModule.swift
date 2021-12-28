import ExpoModulesCore

public class ExpoAppleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoAppleMaps")

    viewManager {
      view {
        AppleMapsView()
      }
      prop("mapType") { (view: AppleMapsView, mapTypeName: String) in
        view.mapType(mapTypeName: mapTypeName)
      }
    }
  }
}
