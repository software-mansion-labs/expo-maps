package expo.modules.maps

import expo.modules.core.interfaces.services.UIManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.maps.googleMaps.GoogleMapsView

class ExpoGoogleMapsModule : Module() {

  override fun definition() = ModuleDefinition {
    Name("ExpoGoogleMaps")

    ViewManager {
      View {
        GoogleMapsView(it).also { googleMapsView ->
          appContext.legacyModule<UIManager>()
            ?.registerLifecycleEventListener(googleMapsView.lifecycleEventListener)
        }
      }

      Prop("enableRotateGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledRotateGestures(enable)
      }

      Prop("enableScrollGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledScrollGestures(enable)
      }

      Prop("enableTiltRotateGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledTiltGestures(enable)
      }

      Prop("enableZoomGestures") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledZoomGestures(enable)
      }

      Prop("mapType") { view: GoogleMapsView, mapType: MapType ->
        view.setMapType(mapType)
      }

      Prop("showZoomControls") { view: GoogleMapsView, enable: Boolean ->
        view.setShowZoomControl(enable)
      }

      Prop("showCompass") { view: GoogleMapsView, enable: Boolean ->
        view.setShowCompass(enable)
      }

      Prop("showMapToolbar") { view: GoogleMapsView, enable: Boolean ->
        view.setShowMapToolbar(enable)
      }

      Prop("showMyLocationButton") { view: GoogleMapsView, enable: Boolean ->
        view.setShowMyLocationButton(enable)
      }

      Prop("showLevelPicker") { view: GoogleMapsView, enable: Boolean ->
        view.setShowLevelPicker(enable)
      }

      Prop("googleMapsJsonStyleString") { view: GoogleMapsView, jsonStyleString: String ->
        view.setMapStyle(jsonStyleString)
      }

      Prop("markers") { view: GoogleMapsView, markerObjects: Array<MarkerObject> ->
        view.setMarkers(markerObjects)
      }

      Prop("polygons") { view: GoogleMapsView, polygonObjects: Array<PolygonObject> ->
        view.setPolygons(polygonObjects)
      }

      Prop("polylines") { view: GoogleMapsView, polylineObjects: Array<PolylineObject> ->
        view.setPolylines(polylineObjects)
      }

      Prop("initialCameraPosition") { view: GoogleMapsView, initialCameraPosition: CameraPosition ->
        view.setInitialCameraPosition(initialCameraPosition)
      }

      Prop("circles") { view: GoogleMapsView, circleObjects: Array<CircleObject> ->
        view.setCircles(circleObjects)
      }

      Prop("clusters") { view: GoogleMapsView, clusterObjects: Array<ClusterObject> ->
        view.setClusters(clusterObjects)
      }

      Prop("enableTraffic") { view: GoogleMapsView, enable: Boolean ->
        view.setEnabledTraffic(enable)
      }

      Prop("kmls") { view: GoogleMapsView, kmlObjects: Array<KMLObject> ->
        view.setKMLs(kmlObjects)
      }

<<<<<<< HEAD
      Prop("geojsons") { view: GoogleMapsView, geoJsonObjects: Array<GeoJsonObject> ->
        view.setGeoJsons(geoJsonObjects)
      }
=======
//      prop("heatmaps") { view: GoogleMapsView, heatmapObjects: Array<HeatmapObject> ->
//        view.setHeatmaps(heatmapObjects)
//      }
>>>>>>> 7d3c60e (Add implementation for heatmaps)
    }
  }
}
