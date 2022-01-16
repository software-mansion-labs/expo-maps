package expo.modules.maps

import android.content.Context
import android.widget.LinearLayout
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.MapStyleOptions
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.collectLatest

class GoogleMapsView(context: Context) : LinearLayout(context), OnMapReadyCallback, ExpoMapView {

  private val mapView: MapView = MapView(context)
  private lateinit var googleMap: GoogleMap
  private lateinit var gestures: GoogleMapsGestures
  private lateinit var markers: GoogleMapsMarkers
  private lateinit var polygons: GoogleMapsPolygons
  private lateinit var polylines: GoogleMapsPolylines
  private val mapReady = MutableStateFlow(false)

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
    gestures = GoogleMapsGestures(googleMap)
    markers = GoogleMapsMarkers(googleMap)
    polygons = GoogleMapsPolygons(googleMap)
    polylines = GoogleMapsPolylines(googleMap)
    CoroutineScope(Dispatchers.Default).launch {
      mapReady.emit(true)
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

  //TODO: setting ui controls in bundles
  fun setZoomControlButton(enabled: Boolean) {
    updateMap {
      googleMap.uiSettings.isZoomControlsEnabled = enabled
    }
  }

  fun setCompassButton(enabled: Boolean) {
    updateMap {
      googleMap.uiSettings.isCompassEnabled = enabled
    }
  }

  fun setMapToolbarButton(enabled: Boolean) {
    updateMap {
      googleMap.uiSettings.isMapToolbarEnabled = enabled
    }
  }

  fun setMyLocationButton(enabled: Boolean) {
    updateMap {
      googleMap.uiSettings.isMyLocationButtonEnabled = enabled
    }
  }

  fun setLevelPickerButton(enabled: Boolean) {
    updateMap {
      googleMap.uiSettings.isIndoorLevelPickerEnabled = enabled
    }
  }

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
