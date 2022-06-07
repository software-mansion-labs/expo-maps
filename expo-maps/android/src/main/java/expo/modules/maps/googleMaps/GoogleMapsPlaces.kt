package expo.modules.maps.googleMaps

import android.content.Context
import android.util.Log
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.PointOfInterest
import com.google.android.libraries.places.api.*
import com.google.android.libraries.places.api.net.*
import expo.modules.kotlin.Promise
import expo.modules.maps.googleMaps.placesUtils.GoogleMapsPlacesSearchCompleter
import expo.modules.maps.googleMaps.placesUtils.GoogleMapsPlacesTokenUtils
import expo.modules.maps.googleMaps.placesUtils.GooglePlacesFetchPlace
import java.io.IOException
import java.util.*

class GoogleMapsPlaces(
  context: Context,
  private val map: GoogleMap,
  private val markers: GoogleMapsMarkers
) : GoogleMap.OnPoiClickListener {

  private val placesClient: PlacesClient
  private val tokenUtils: GoogleMapsPlacesTokenUtils
  private val placesSearchCompleter: GoogleMapsPlacesSearchCompleter
  private val placesFetcher: GooglePlacesFetchPlace
  private var arePOIClickable: Boolean = false

  init {
    map.setOnPoiClickListener(this)

    val properties = Properties()
    var key = "EMPTY_KEY"

    try {
      properties.load(context.assets.open("apikeys.properties"))
      key = properties.getProperty("GooglePlacesApiKey") ?: "EMPTY_KEY"
    } catch (e: IOException) {
      Log.e(
        "Expo-Maps Google Places",
        "Could not find apikeys.properties file. Make sure the file exists in assets directory."
      )
    }

    Places.initialize(context, key)
    placesClient = Places.createClient(context)
    tokenUtils = GoogleMapsPlacesTokenUtils()

    placesSearchCompleter = GoogleMapsPlacesSearchCompleter(placesClient, tokenUtils, map)
    placesFetcher = GooglePlacesFetchPlace(placesClient, tokenUtils, markers, map)
  }

  fun fetchSearchCompletions(searchQueryFragment: String, promise: Promise) {
    placesSearchCompleter.autoComplete(searchQueryFragment, promise)
  }

  fun createSearchRequest(place: String) {
    val placeId = getPlaceIdFromCompletion(place)
    if (placeId.isNotBlank()) placesFetcher.search(placeId) else markers.detachAndDeletePOIMarkers()
  }

  fun setClickablePOIs(arePOIClickable: Boolean) {
    this.arePOIClickable = arePOIClickable
  }

  override fun onPoiClick(pointOfInterest: PointOfInterest) {
    if (arePOIClickable) {
      val update = CameraUpdateFactory.newLatLng(
        LatLng(
          pointOfInterest.latLng.latitude,
          pointOfInterest.latLng.longitude
        )
      )
      map.animateCamera(update)
    }
  }

  private fun getPlaceIdFromCompletion(place: String) =
    place.split(';').getOrNull(1) ?: ""
}
