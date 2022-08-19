package expo.modules.maps.googleMaps

import com.google.android.gms.maps.GoogleMap
import expo.modules.kotlin.callbacks.Callback
import expo.modules.maps.records.CameraPositionRecord
import expo.modules.maps.records.LatLngRecord
import expo.modules.maps.records.PointOfInterestRecord


class GoogleMapsCallbacks(private val map: GoogleMap) {
  fun setupOnMapLoaded(onMapLoaded: Callback<Unit>) {
    map.setOnMapLoadedCallback {
      onMapLoaded(Unit)
    }
  }

  fun setupOnMapClick(onMapClick: Callback<LatLngRecord>) {
    map.setOnMapClickListener {
      onMapClick(LatLngRecord(it))
    }
  }

  fun setupOnLongPress(onLongPress: Callback<LatLngRecord>) {
    map.setOnMapLongClickListener {
      onLongPress(LatLngRecord(it))
    }
  }

  fun setupOnRegionChange(onRegionChange: Callback<CameraPositionRecord>) {
    map.setOnCameraMoveListener {
      onRegionChange(CameraPositionRecord(map.cameraPosition))
    }
  }

  fun setupOnRegionChangeStarted(onRegionChangeStarted: Callback<CameraPositionRecord>) {
    map.setOnCameraMoveStartedListener {
      onRegionChangeStarted(CameraPositionRecord(map.cameraPosition))
    }
  }

  fun setupOnRegionChangeComplete(onRegionChangeComplete: Callback<CameraPositionRecord>, clusters: GoogleMapsClusters) {
    map.setOnCameraIdleListener {
      clusters.onCameraIdle()
      onRegionChangeComplete(CameraPositionRecord(map.cameraPosition))
    }
  }

  fun setupOnPoiClick(onPoiClick: Callback<PointOfInterestRecord>) {
    map.setOnPoiClickListener {
      onPoiClick(PointOfInterestRecord(it))
    }
  }

  fun setupOnLocationButtonButtonPress(onLocationButtonPress: Callback<Unit>){
    map.setOnMyLocationButtonClickListener {
      onLocationButtonPress(Unit)
      false
    }
  }

  fun setupOnLocationDotPress(onLocationDotPress:Callback<Unit>){
    map.setOnMyLocationClickListener {
      onLocationDotPress(Unit)
    }
  }
}
