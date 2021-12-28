import ExpoModulesCore

public class ExpoGoogleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        GoogleMapsView()
      }
      prop("mapType") { (view: GoogleMapsView, mapTypeName: String) in
        view.mapType(mapTypeName: mapTypeName)
      }
    }
  }
}
