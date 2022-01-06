import ExpoModulesCore

public class ExpoGoogleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        GoogleMapsView()
      }
    }
  }
}