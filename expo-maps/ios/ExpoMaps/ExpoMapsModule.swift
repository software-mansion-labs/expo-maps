import ExpoModulesCore

public class ExpoMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoMaps")
    
    function("someGreatMethodAsync") { (options: [String: String]) in
      print("Hello 👋")
    }
    
    viewManager {
      view {
        SolidColorView()
      }
      
      prop("color") { (view: SolidColorView, color: CGColor) in
        view.setColor(color)
      }
    }
  }
}
