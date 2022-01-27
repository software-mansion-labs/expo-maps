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
          appContext.legacyModule<UIManager>()
            ?.registerLifecycleEventListener(googleMapsView.lifecycleEventListener)
        }
      }

      prop("enableRotateGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledRotateGestures(enable)
      }

      prop("enableScrollGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledScrollGestures(enable)
      }

      prop("enableTiltRotateGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledTiltGestures(enable)
      }

      prop("enableZoomGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledZoomGestures(enable)
      }

      prop("mapType") { view: GoogleMapsView, mapType: MapType ->
        view.setMapType(mapType)
      }

      prop("showZoomControls") { view: GoogleMapsView, enable: Boolean ->
        view.setShowZoomControl(enable)
      }

      prop("showCompass") { view: GoogleMapsView, enable: Boolean ->
        view.setShowCompass(enable)
      }

      prop("showMapToolbar") { view: GoogleMapsView, enable: Boolean ->
        view.setShowMapToolbar(enable)
      }

      //TODO: enable MyLocation layer, otherwise My location button will not be displayed
      prop("showMyLocationButton") { view: GoogleMapsView, enable: Boolean ->
        view.setShowMyLocationButton(enable)
      }
      prop("showLevelPicker") { view: GoogleMapsView, enable: Boolean ->
        view.setShowLevelPicker(enable)
      }

      prop("jsonStyleString") { view: GoogleMapsView, jsonStyleString: String ->
        view.setMapStyle(jsonStyleString)
      }

      prop("markers") { view: GoogleMapsView, markerObjects: Array<MarkerObject> ->
        view.setMarkers(markerObjects)
      }

      prop("polygons") { view: GoogleMapsView, polygonObjects: Array<PolygonObject> ->
        view.setPolygons(polygonObjects)
      }

      prop("polylines") { view: GoogleMapsView, polylineObjects: Array<PolylineObject> ->
        view.setPolylines(polylineObjects)
      }
    }
  }
}
