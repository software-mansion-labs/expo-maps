package expo.modules.maps.googleMaps

import android.os.Bundle
import androidx.core.os.bundleOf
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.LatLngBounds
import expo.modules.kotlin.callbacks.Callback
import expo.modules.maps.records.CameraPositionRecord
import expo.modules.maps.records.LatLngRecord
import expo.modules.maps.records.PointOfInterestRecord
import kotlin.math.abs


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

  fun setupOnRegionChangeComplete(onRegionChangeComplete: Callback<CameraPositionRecord>) {
    map.setOnCameraIdleListener {
      onRegionChangeComplete(CameraPositionRecord(map.cameraPosition))
    }
  }

  fun setupOnPoiClick(onPoiClick: Callback<PointOfInterestRecord>) {
    map.setOnPoiClickListener {
      onPoiClick(PointOfInterestRecord(it))
    }
  }
}
