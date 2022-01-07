package expo.modules.maps

import android.content.Context
import android.widget.LinearLayout
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.collectLatest

class GoogleMapsView(context: Context): LinearLayout(context), OnMapReadyCallback {

  private val mapView: MapView = MapView(context)
  private lateinit var googleMap: GoogleMap
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
    CoroutineScope(Dispatchers.Default).launch {
      mapReady.emit(true)
    }
  }

  fun mapType(mapType: MapType) {
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
