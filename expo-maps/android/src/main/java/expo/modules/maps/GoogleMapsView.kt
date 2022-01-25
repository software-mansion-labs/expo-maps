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

  fun setShowZoomControlButton(enabled: Boolean) {
    updateMap {
      googleMap.uiSettings.isZoomControlsEnabled = enabled
    }
  }

  fun setShowCompassButton(enabled: Boolean) {
    // the compass will only ever appear when the camera is oriented such that
    // it has a non-zero bearing or non-zero tilt. When the user clicks on the compass,
    // the camera animates back to the default orientation and the compass fades away shortly afterwards
    updateMap {
      googleMap.uiSettings.isCompassEnabled = enabled
    }
  }

  fun setShowMapToolbarButton(enabled: Boolean) {
    // the toolbar slides in when the user taps a marker
    // and slides out again when the marker is no longer in focust
    updateMap {
      googleMap.uiSettings.isMapToolbarEnabled = enabled
    }
  }

  fun setShowMyLocationButton(enabled: Boolean) {
    updateMap {
      // the My Location button appears in the top right corner of
      // the screen only when the My Location layer is enabled
      //TODO: enable my location layer + firstly handle needed permissions request
      //googleMap.isMyLocationEnabled = true
      googleMap.uiSettings.isMyLocationButtonEnabled = enabled
    }
  }

  fun setShowLevelPickerButton(enabled: Boolean) {
    // appears only when the user is viewing an indoor map
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
