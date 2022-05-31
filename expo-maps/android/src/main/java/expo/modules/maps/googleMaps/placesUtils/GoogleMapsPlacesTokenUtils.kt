package expo.modules.maps.googleMaps.placesUtils

import com.google.android.libraries.places.api.model.AutocompleteSessionToken

class GoogleMapsPlacesTokenUtils {

    private var token: AutocompleteSessionToken?

    init {
        token = AutocompleteSessionToken.newInstance()
    }

    fun setNewSessionToken() {
        token = AutocompleteSessionToken.newInstance()
    }

    fun deleteToken() {
        token = null
    }

    fun getToken(): AutocompleteSessionToken? {
        return token
    }
}