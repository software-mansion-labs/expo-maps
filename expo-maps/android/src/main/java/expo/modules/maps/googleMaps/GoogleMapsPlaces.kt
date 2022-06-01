package expo.modules.maps.googleMaps

import android.content.Context
import android.widget.Toast
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.PointOfInterest
import com.google.android.libraries.places.api.*
import com.google.android.libraries.places.api.net.*
import expo.modules.kotlin.Promise
import expo.modules.maps.googleMaps.placesUtils.GoogleMapsPlacesSearchCompleter
import expo.modules.maps.googleMaps.placesUtils.GoogleMapsPlacesTokenUtils
import expo.modules.maps.googleMaps.placesUtils.GooglePlacesFetchPlace

class GoogleMapsPlaces(private val context: Context, map: GoogleMap, private val markers: GoogleMapsMarkers): GoogleMap.OnPoiClickListener {

    private val placesClient: PlacesClient
    private val tokenUtils: GoogleMapsPlacesTokenUtils
    private val placesSearchCompleter: GoogleMapsPlacesSearchCompleter
    private val placesFetcher: GooglePlacesFetchPlace
    private var clickablePOIs: Boolean = true

    init {
        Places.initialize(context, "apiKey")
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
       if (placeId.isBlank()) {
           markers.detachAndDeletePOIMarkers()
       }
       placesFetcher.search(placeId)
   }

    private fun getPlaceIdFromCompletion(place: String): String {
        val tmpStr = place.split(';')
        return if (tmpStr.size > 1) tmpStr[1] else ""
    }

    fun setClickablePOIs(clickablePOIs: Boolean) {
        this.clickablePOIs = clickablePOIs
    }

    override fun onPoiClick(poi: PointOfInterest) {
        if (clickablePOIs) {
            Toast.makeText(this.context, """Clicked: ${poi.name}
            Place ID:${poi.placeId}
            Latitude:${poi.latLng.latitude} Longitude:${poi.latLng.longitude}""",
                    Toast.LENGTH_SHORT
            ).show()
        }
    }


}