package expo.modules.maps.googleMaps

import android.content.Context
import android.widget.LinearLayout
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MapStyleOptions
import expo.modules.maps.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.collectLatest

class GoogleMapsView(context: Context) : LinearLayout(context), OnMapReadyCallback, ExpoMapView {

  private val mapView: MapView = MapView(context)
  private lateinit var googleMap: GoogleMap
  private lateinit var controls: GoogleMapsControls
  private lateinit var gestures: GoogleMapsGestures
  private lateinit var markers: GoogleMapsMarkers
  private lateinit var clusters: GoogleMapsClusters
  private lateinit var polygons: GoogleMapsPolygons
  private lateinit var polylines: GoogleMapsPolylines
  private lateinit var circles: GoogleMapsCircles
  private lateinit var kmls: GoogleMapsKMLs
  private val mapReady = MutableStateFlow(false)
  private var wasInitialCameraPositionSet = false

  val lifecycleEventListener = MapViewLifecycleEventListener(mapView)

  init {
    mapView.onCreate(null)
    mapView.getMapAsync(this)
    mapView.onStart()
    mapView.onResume()
    addView(mapView)
  }

  override fun onMapReady(googleMap: GoogleMap) {
    this.googleMap = googleMap
    controls = GoogleMapsControls(googleMap)
    gestures = GoogleMapsGestures(googleMap)
    markers = GoogleMapsMarkers(googleMap)
    clusters = GoogleMapsClusters(context, googleMap)
    polygons = GoogleMapsPolygons(googleMap)
    polylines = GoogleMapsPolylines(googleMap)
    circles = GoogleMapsCircles(googleMap)
    kmls = GoogleMapsKMLs(context, googleMap)
    CoroutineScope(Dispatchers.Default).launch {
      mapReady.emit(true)
    }
  }

  fun setShowZoomControl(enable: Boolean) {
    updateMap {
      controls.setShowZoomControl(enable)
    }
  }

  fun setShowCompass(enable: Boolean) {
    updateMap {
      controls.setShowCompass(enable)
    }
  }

  fun setShowMapToolbar(enable: Boolean) {
    updateMap {
      controls.setShowMapToolbar(enable)
    }
  }

  fun setShowMyLocationButton(enable: Boolean) {
    updateMap {
      controls.setShowMyLocationButton(enable)
    }
  }

  fun setShowLevelPicker(enable: Boolean) {
    updateMap {
      controls.setShowLevelPicker(enable)
    }
  }

  fun setEnabledRotateGestures(enabled: Boolean) {
    updateMap {
      gestures.setEnabledRotateGesture(enabled)
    }
  }

  fun setEnabledScrollGestures(enabled: Boolean) {
    updateMap {
      gestures.setEnabledScrollGesture(enabled)
    }
  }

  fun setEnabledTiltGestures(enabled: Boolean) {
    updateMap {
      gestures.setEnabledTiltGesture(enabled)
    }
  }

  fun setEnabledZoomGestures(enabled: Boolean) {
    updateMap {
      gestures.setEnabledZoomGesture(enabled)
    }
  }

  fun setEnabledAllGestures(enabled: Boolean) {
    updateMap {
      gestures.setEnabledAllGestures(enabled)
    }
  }

  override fun setMapType(mapType: MapType) {
    val googleMapType = when (mapType) {
      MapType.Normal -> GoogleMap.MAP_TYPE_NORMAL
      MapType.Terrain -> GoogleMap.MAP_TYPE_TERRAIN
      MapType.Satellite -> GoogleMap.MAP_TYPE_SATELLITE
      MapType.Hybrid -> GoogleMap.MAP_TYPE_HYBRID
    }

    updateMap {
      googleMap.mapType = googleMapType
    }
  }

  fun setMapStyle(jsonStyleString: String) {
    if (jsonStyleString.isNotEmpty()) {
      updateMap {
        googleMap.setMapStyle(MapStyleOptions(jsonStyleString))
      }
    } else {
      updateMap {
        googleMap.setMapStyle(null)
      }
    }
  }

  override fun setMarkers(markerObjects: Array<MarkerObject>) {
    updateMap {
      markers.setMarkers(markerObjects)
    }
  }

  override fun setPolygons(polygonObjects: Array<PolygonObject>) {
    updateMap {
      polygons.setPolygons(polygonObjects)
    }
  }

  override fun setPolylines(polylineObjects: Array<PolylineObject>) {
    updateMap {
      polylines.setPolylines(polylineObjects)
    }
  }

  override fun setCircles(circleObjects: Array<CircleObject>) {
    updateMap {
      circles.setCircles(circleObjects)
    }
  }


  override fun setInitialCameraPosition(initialCameraPosition: CameraPosition) {
    if (!wasInitialCameraPositionSet) {
      updateMap {
        val cameraUpdate = CameraUpdateFactory.newLatLngZoom(
          LatLng(initialCameraPosition.latitude, initialCameraPosition.longitude),
          initialCameraPosition.zoom.toFloat()
        )
        if (initialCameraPosition.animate) {
          googleMap.animateCamera(cameraUpdate)
        } else {
          googleMap.moveCamera(cameraUpdate)
        }
      }
      wasInitialCameraPositionSet = true
    }
  }

  override fun setClusters(clusterObjects: Array<ClusterObject>) {
    updateMap {
      clusters.setClusters(clusterObjects)
    }
  }

  override fun setEnabledTraffic(enableTraffic: Boolean) {
    updateMap {
      googleMap.isTrafficEnabled = enableTraffic
    }
  }

  override fun setKMLs(kmlObjects: Array<KMLObject>) {
    updateMap {
      kmls.setKMLs(kmlObjects)
    }
  }

  /*
        Calls function provided as an argument when OnMapReadyCallback fires,
        subscribes to StateFlow in a background but calls lambda on a main thread.
        After calling lambda the subscription is canceled.
        StateFlow holds the latest value so even if updateMap is called after
        OnMapReadyCallback, StateFlow emits the latest value letting provided lambda to be executed.
       */
  private fun updateMap(update: () -> Unit) {
    CoroutineScope(Dispatchers.Default).launch {
      mapReady.collectLatest {
        if (it) {
          withContext(Dispatchers.Main) {
            update()
          }
          cancel()
        }
      }
    }
  }
}
