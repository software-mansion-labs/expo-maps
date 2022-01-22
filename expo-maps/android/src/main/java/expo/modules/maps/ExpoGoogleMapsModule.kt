package expo.modules.maps

import expo.modules.core.interfaces.services.UIManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

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
        view.setMapType(mapType)
      }
      prop("jsonStyleString") { view: GoogleMapsView, jsonStyleString: String ->
        view.setMapStyle(jsonStyleString)
      }
    }
  }
}
