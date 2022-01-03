package expo.modules.maps

import android.content.Context
import android.widget.LinearLayout
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback

class GoogleMapsView(context: Context): LinearLayout(context), OnMapReadyCallback {

  private val mapView: MapView = MapView(context)

  val lifecycleEventListener = MapViewLifecycleEventListener(mapView)

  init {
    mapView.onCreate(null)
    mapView.getMapAsync(this)
    mapView.onStart()
    mapView.onResume()
    addView(mapView)
  }

  override fun onMapReady(googleMap: GoogleMap) {

  }

  fun mapView(mapType: MapType) {
    val googleMapType = when (mapType) {
      MapType.normal -> GoogleMap.MAP_TYPE_NORMAL
      MapType.terrain -> GoogleMap.MAP_TYPE_TERRAIN
      MapType.satellite -> GoogleMap.MAP_TYPE_SATELLITE
      MapType.hybrid -> GoogleMap.MAP_TYPE_HYBRID
    }
    mapView.getMapAsync {map: GoogleMap ->
      map.mapType = googleMapType
    }
  }
}
