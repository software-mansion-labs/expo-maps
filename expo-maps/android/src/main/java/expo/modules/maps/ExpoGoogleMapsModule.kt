package expo.modules.maps

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


class ExpoGoogleMapsModule : Module() {
  override fun definition() = ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view { SolidColorView(it) }
    }
  }
}
