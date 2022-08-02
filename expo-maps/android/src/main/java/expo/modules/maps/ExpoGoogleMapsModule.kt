package expo.modules.maps

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.UIManagerModule
import com.google.android.gms.maps.model.LatLng
import expo.modules.core.interfaces.services.UIManager
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.maps.googleMaps.GoogleMapsView
import expo.modules.maps.googleMaps.events.GoogleMapsEventEmitterManager
import expo.modules.maps.googleMaps.events.MapEventsNames

class ExpoGoogleMapsModule : Module() {

  override fun definition() = ModuleDefinition {
    Name("ExpoGoogleMaps")

    Events(events = MapEventsNames.values().map { it.eventName }.toTypedArray())
    println(MapEventsNames.values().map { it.eventName }.toTypedArray().contentDeepToString())

    val googleMapsEventEmitterManager = GoogleMapsEventEmitterManager(::sendEvent)
    
    AsyncFunction("getSearchCompletions") { viewHandle: Int, searchQueryFragment: String, promise: Promise ->
      val rnContext = appContext.reactContext as? ReactApplicationContext ?: return@AsyncFunction
      val uiManager = rnContext.getNativeModule(UIManagerModule::class.java) ?: return@AsyncFunction
      appContext.activityProvider?.currentActivity?.runOnUiThread {
        val view = uiManager.resolveView(viewHandle) as GoogleMapsView
        view.fetchPlacesSearchCompletions(searchQueryFragment, promise)
      }
    }

    ViewManager {
      Events("onMapClick","onMapReady", "onMapLoaded", "onRegionChange",
        "onRegionChangeComplete","onRegionChangeStarted", "onPoiClick")

      View {
        GoogleMapsView(it).also { googleMapsView ->
          appContext.legacyModule<UIManager>()
            ?.registerLifecycleEventListener(googleMapsView.lifecycleEventListener)
          googleMapsView.registerEvents(googleMapsEventEmitterManager)
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

      Prop("geojsons") { view: GoogleMapsView, geoJsonObjects: Array<GeoJsonObject> ->
        view.setGeoJsons(geoJsonObjects)
      }

      Prop("overlays") { view: GoogleMapsView, overlayObjects: Array<OverlayObject> ->
        view.setOverlays(overlayObjects)
      }
      
      Prop("heatmaps") { view: GoogleMapsView, heatmapObjects: Array<HeatmapObject> ->
        view.setHeatmaps(heatmapObjects)
      }
      
      Prop("createPOISearchRequest") { view: GoogleMapsView, place: String ->
        view.createPlaceSearchRequest(place)
      }

      Prop("clickablePOIs") { view: GoogleMapsView, arePOIClickable: Boolean ->
        view.setClickablePOIs(arePOIClickable)
      }
    }
  }
}
