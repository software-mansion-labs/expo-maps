package expo.modules.maps.googleMaps

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Looper
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.*
import com.google.android.gms.maps.GoogleMap
import expo.modules.kotlin.callbacks.Callback
import expo.modules.maps.records.CameraPositionRecord
import expo.modules.maps.records.LatLngRecord
import expo.modules.maps.records.PointOfInterestRecord
import expo.modules.maps.records.UserLocationRecord


class GoogleMapsCallbacks(private val map: GoogleMap, private val context: Context) {
  private lateinit var locationProvider: FusedLocationProviderClient
  private lateinit var locationChangeCallback: LocationCallback
  private lateinit var locationRequest: LocationRequest
  private var locationCallbackPriority: Int = LocationRequest.PRIORITY_NO_POWER
  private var locationCallbackInterval: Long = 5000
  private var onLocationButtonPress: Callback<UserLocationRecord>? = null

  fun setupOnMapLoaded(onMapLoaded: Callback<Unit>) {
    map.setOnMapLoadedCallback {
      onMapLoaded(Unit)
    }
  }

  fun setupOnMapPress(onMapPress: Callback<LatLngRecord>) {
    map.setOnMapClickListener {
      onMapPress(LatLngRecord(it))
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

  fun setupOnRegionChangeComplete(
    onRegionChangeComplete: Callback<CameraPositionRecord>,
    clusters: GoogleMapsClusters
  ) {
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

  fun setupOnLocationButtonButtonPress(onLocationButtonPress: Callback<UserLocationRecord>) {
    this.onLocationButtonPress = onLocationButtonPress
  }

  fun setupOnLocationDotPress(onLocationDotPress: Callback<UserLocationRecord>) {
    map.setOnMyLocationClickListener {
      onLocationDotPress(UserLocationRecord(it))
    }
  }

  private fun setupOnLocationChangeRequests() {
    locationProvider.removeLocationUpdates(locationChangeCallback)
    locationRequest = LocationRequest.create().apply {
      priority = locationCallbackPriority
      interval = locationCallbackInterval
    }
    if (ActivityCompat.checkSelfPermission(
        context,
        Manifest.permission.ACCESS_FINE_LOCATION
      ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
        context,
        Manifest.permission.ACCESS_COARSE_LOCATION
      ) != PackageManager.PERMISSION_GRANTED
    ) {
      return
    }
    locationProvider.requestLocationUpdates(
      locationRequest,
      locationChangeCallback,
      Looper.getMainLooper()
    )
    /*On location button click listener is set here in order to get permission updates more often.
    * In the future it should be called only when the permissions change */
    map.setOnMyLocationButtonClickListener {
      locationProvider.lastLocation.addOnSuccessListener { location ->
        onLocationButtonPress?.let { it(UserLocationRecord(location)) }
      }
      false
    }
  }

  fun setupOnLocationChange(onLocationChange: Callback<UserLocationRecord>) {
    locationProvider = LocationServices.getFusedLocationProviderClient(context)
    locationChangeCallback = object: LocationCallback() {
      override fun onLocationResult(loactionResult: LocationResult?) {
        loactionResult ?: return
        for (location in loactionResult.locations) {
          onLocationChange(UserLocationRecord(location))
        }
        super.onLocationResult(loactionResult)
      }
    }
    setupOnLocationChangeRequests()
  }

  fun setLocationCallbackPriority(locationCallbackPriority: Int) {
    this.locationCallbackPriority = locationCallbackPriority
    setupOnLocationChangeRequests()
  }

  fun setLocationCallbackInterval(locationCallbackInterval: Long) {
    this.locationCallbackInterval = locationCallbackInterval
    setupOnLocationChangeRequests()
  }

  fun removeLocationRequests() {
    locationProvider.removeLocationUpdates(locationChangeCallback)
  }
}
