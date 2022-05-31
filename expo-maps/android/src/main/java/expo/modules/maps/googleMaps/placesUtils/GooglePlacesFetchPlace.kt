package expo.modules.maps.googleMaps.placesUtils

import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.libraries.places.api.model.AutocompleteSessionToken
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.api.net.FetchPlaceRequest
import com.google.android.libraries.places.api.net.FetchPlaceResponse
import com.google.android.libraries.places.api.net.PlacesClient
import expo.modules.maps.MarkerObject
import expo.modules.maps.googleMaps.GoogleMapsMarkers

class GooglePlacesFetchPlace(private val placesClient: PlacesClient, private val tokenUtils: GoogleMapsPlacesTokenUtils,
                             private val markers: GoogleMapsMarkers, private val map: GoogleMap) {

    private var fetchedPlace: Place? = null
        set(newValue) {
            field = newValue
            displayMarker()
        }

    fun search(placeId: String) {
        try {
            val placeFields = listOf(Place.Field.LAT_LNG, Place.Field.NAME, Place.Field.ADDRESS)
            val request = FetchPlaceRequest.newInstance(placeId, placeFields)

            placesClient.fetchPlace(request)
                .addOnSuccessListener { response: FetchPlaceResponse ->
                    fetchedPlace = response.place
                }.addOnFailureListener { exception: Exception ->
                    val errorMessage = "Fetching Place error"
                    println(String.format("{} with message: {}", errorMessage, exception.message))
                }
        } catch (exception: PlaceFetcherException) {
            println(exception.message)
        } finally {
            tokenUtils.setNewSessionToken()
        }
    }

    private fun getToken(): AutocompleteSessionToken {
        val token = tokenUtils.getToken()
        return token ?: throw PlaceFetcherException("Missing AutocompleteSessionToken")
    }

    private fun displayMarker() {
        val marker = getMarkerToDisplay() ?: return
        markers.setPOIMarkers(arrayOf(marker))
        val update = CameraUpdateFactory.newLatLng(LatLng(marker.latitude, marker.longitude))
        map.moveCamera(update)
    }

    private fun getMarkerToDisplay(): MarkerObject? {
        val place = (if (fetchedPlace != null) fetchedPlace else null) ?: return null
        return try {
            MarkerObject(
                getLatitude(place),
                getLongitude(place),
                place.name ?: "",
                place.address ?: "",
                null,
                "red",
                false,
                null,
                null,
                1.0)
        } catch (exception: PlaceRequiredFieldsException) {
            println(String.format("Mapping to MarkerObject error with message: {}", exception.message))
            null
        }

    }

    private fun getLatitude (place: Place): Double {
        return place.latLng?.latitude ?: throw PlaceRequiredFieldsException("Missing latitude value.")
    }

    private fun getLongitude (place: Place): Double {
        return place.latLng?.longitude ?: throw PlaceRequiredFieldsException("Missing longitude value.")
    }
}

class PlaceRequiredFieldsException(message: String): Exception(message)
class PlaceFetcherException(message: String): Exception(message)