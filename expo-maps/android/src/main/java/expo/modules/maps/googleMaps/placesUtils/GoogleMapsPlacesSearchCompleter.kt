package expo.modules.maps.googleMaps.placesUtils

import com.google.android.gms.maps.GoogleMap
import com.google.android.libraries.places.api.model.AutocompletePrediction
import com.google.android.libraries.places.api.model.AutocompleteSessionToken
import com.google.android.libraries.places.api.model.RectangularBounds
import com.google.android.libraries.places.api.model.TypeFilter
import com.google.android.libraries.places.api.net.*
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException

class GoogleMapsPlacesSearchCompleter(private val placesClient: PlacesClient,
                                      private val tokenUtils: GoogleMapsPlacesTokenUtils,
                                      private val map: GoogleMap) {

    private var searchCompleterResults = mutableListOf<AutocompletePrediction>()

    fun autoComplete(searchQueryFragment: String, searchCompletionsPromise: Promise) {
        try {
            val request = buildAutocompleteRequest(searchQueryFragment)
            placesClient.findAutocompletePredictions(request)
                    .addOnSuccessListener { response: FindAutocompletePredictionsResponse ->
                        searchCompleterResults = response.autocompletePredictions
                        resolveSearchCompletionsPromise(searchCompletionsPromise)
                    }.addOnFailureListener { exception: Exception? ->
                        val errorMessage = String.format("Fetching AutocompletePredictions error, %s",
                                exception?.message)
                        searchCompletionsPromise.reject(SearchCompleterException(errorMessage))
                    }
        } catch (exception: SearchCompleterException) {
            searchCompletionsPromise.reject(exception)
        } catch (exception: Exception) {
            searchCompletionsPromise.reject(CodedException(exception.message, exception.cause))
        }
    }

    private fun buildAutocompleteRequest(query: String): FindAutocompletePredictionsRequest {
        return try {
            FindAutocompletePredictionsRequest.builder()
                    .setLocationBias(getSearchCompletionRegion())
                    .setTypeFilter(TypeFilter.ESTABLISHMENT)
                    .setSessionToken(getToken())
                    .setQuery(query)
                    .build()
        } catch (exception: SearchCompleterException) {
            val errorMessage = String.format("Error while building AutocompletePredictionsRequest, %s",
                    exception.message)
            throw SearchCompleterException(errorMessage)
        }
    }

    private fun getSearchCompletionRegion(): RectangularBounds {
        val visibleRegion = map.projection.visibleRegion.latLngBounds
        return RectangularBounds.newInstance(visibleRegion.southwest, visibleRegion.northeast)
    }

    private fun getToken(): AutocompleteSessionToken {
        return tokenUtils.getToken() ?: throw SearchCompleterException("Missing AutocompleteSessionToken.")
    }

    private fun resolveSearchCompletionsPromise(searchCompletionsPromise: Promise) {
        val results = getSearchCompletions()
        searchCompletionsPromise.resolve(results)
    }

    private fun getSearchCompletions(): List<String> {
        return if(searchCompleterResults.isNotEmpty()) mapSearchCompletions(searchCompleterResults) else emptyList()
    }

    private fun mapSearchCompletions(completions: List<AutocompletePrediction>): List<String> {
       return completions.map { it.getFullText(null).toString() + ";" + it.placeId }
    }
}

class SearchCompleterException(detailMessage: String): CodedException(detailMessage)

