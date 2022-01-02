import ExpoModulesCore

public class ExpoGoogleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        GoogleMapsView()
      }
      prop("mapType") { (view: GoogleMapsView, mapType: MapType) in
        view.mapType(mapType: mapType)
      }
    }
  }
}
