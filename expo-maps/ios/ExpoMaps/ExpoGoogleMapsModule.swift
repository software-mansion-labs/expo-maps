import ExpoModulesCore

public class ExpoMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoMaps")

    viewManager {
      view {
        GoogleMapsView()
      }
    }
  }
}
