package expo.modules.maps.googleMaps.events

import android.os.Bundle
import com.google.android.gms.maps.GoogleMap

abstract class GoogleMapsCameraEventEmitter<T> {

  protected val listeners: MutableList<T> = mutableListOf()
  protected abstract val sendEvent: (String, Bundle?) -> Unit
  protected abstract val name: String
  protected abstract val googleMap: GoogleMap
  protected abstract val baseListener: T

  fun addListener(listener: T) {
    listeners.add(listener)
    updateMapListener()
  }

  fun removeListener(listener: T) {
    listeners.remove(listener)
    updateMapListener()
  }

  abstract fun updateMapListener()
}