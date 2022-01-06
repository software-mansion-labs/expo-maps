import ExpoModulesCore

public class ExpoAppleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoAppleMaps")

    viewManager {
      view {
        AppleMapsView()
      }
    }
  }
}
