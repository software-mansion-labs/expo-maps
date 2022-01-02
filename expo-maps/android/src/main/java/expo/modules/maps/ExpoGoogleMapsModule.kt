package expo.modules.maps

import expo.modules.core.interfaces.services.UIManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

enum class MapType(val value: String) {
  normal("normal"),
  hybrid("hybrid"),
  satelite("satelite"),
  terain("terain")
}

class ExpoGoogleMapsModule : Module() {

  override fun definition() = ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        GoogleMapsView(it).also { googleMapsView ->
          appContext.legacyModule<UIManager>()?.registerLifecycleEventListener(googleMapsView.lifecycleEventListener)
        }
      }
      prop("mapType") { view: GoogleMapsView, mapType: MapType ->
        view.mapView(mapType)
      }
    }
  }
}
