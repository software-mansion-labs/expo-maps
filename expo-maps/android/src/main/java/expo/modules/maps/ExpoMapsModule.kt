package expo.modules.maps

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


class ExpoMapsModule : Module() {
  override fun definition() = ModuleDefinition {
    name("ExpoMaps")

    function("someGreatMethodAsync") { options: Map<String, String> ->
      println("Hello 👋")
      null as Any?
    }

    viewManager {
      view { SolidColorView(it) }
      prop("color") { view: SolidColorView, color: Int ->
        view.setColor(color)
      }
    }
  }
}
