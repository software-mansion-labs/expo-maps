package expo.modules.maps

import expo.modules.core.interfaces.LifecycleEventListener
import expo.modules.core.interfaces.services.UIManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition


class ExpoGoogleMapsModule : Module() {

  private val googleMapViews = mutableListOf<GoogleMapsView>()

  override fun definition() = ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        val view = GoogleMapsView(it)
        googleMapViews.add(view)

        appContext.legacyModule<UIManager>()?.registerLifecycleEventListener(
          object : LifecycleEventListener {

            override fun onHostResume() {
              googleMapViews.forEach { it.mapView.onResume() }
            }

            override fun onHostPause() {
              googleMapViews.forEach { it.mapView.onPause() }
            }

            override fun onHostDestroy() {
              googleMapViews.forEach { it.mapView.onDestroy() }
            }
          }
        )
        view
      }
    }
  }
}
