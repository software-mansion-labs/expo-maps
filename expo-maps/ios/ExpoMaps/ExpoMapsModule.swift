import ExpoModulesCore

public class ExpoMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoMaps")

    viewManager {
      view {
        GoogleMapsView()
      }

      prop("apiKey") { (view: GoogleMapsView, apiKey: String) in
        view.authenticateAndCreateMapView(apiKey: apiKey)
      }
    }
  }
}
