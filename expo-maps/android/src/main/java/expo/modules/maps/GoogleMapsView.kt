package expo.modules.maps

import GoogleMapsMarkers
import android.content.Context
import android.widget.LinearLayout
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.MapStyleOptions
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.collectLatest

class GoogleMapsView(context: Context): LinearLayout(context), OnMapReadyCallback, ExpoMapView {

  private val mapView: MapView = MapView(context)
  private lateinit var googleMap: GoogleMap
  private val mapReady = MutableStateFlow(false)
  private lateinit var markers: GoogleMapsMarkers

  val lifecycleEventListener = MapViewLifecycleEventListener(mapView)

  init {
    this.mapView.onCreate(null)
    this.mapView.getMapAsync(this)
    this.mapView.onStart()
    this.mapView.onResume()
    this.addView(mapView)
  }

  override fun onMapReady(googleMap: GoogleMap) {
    this.googleMap = googleMap
    this.markers = GoogleMapsMarkers(this.googleMap)
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

    this.updateMap {
      this.googleMap.mapType = googleMapType
    }
  }

  fun setMapStyle(jsonStyleString: String) {
    if (jsonStyleString.isNotEmpty()) {
      updateMap {
        this.googleMap.setMapStyle(MapStyleOptions(jsonStyleString))
      }
    } else {
      updateMap {
        this.googleMap.setMapStyle(null)
      }
    }
  }

  override fun setMarkers(markerObjects: Array<MarkerObject>) {
    this.updateMap {
      this.markers.setMarkers(markerObjects)
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

