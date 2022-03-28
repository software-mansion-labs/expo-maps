package expo.modules.maps.googleMaps

import com.google.android.gms.maps.model.BitmapDescriptor
import com.google.android.gms.maps.model.BitmapDescriptorFactory

/*
  Returns asset based marker icon if localUri is not null, otherwise returns default marker with
  provided color. Hue value must be between 0 and 360, this constraint comes from google api.
  https://developers.google.com/android/reference/com/google/android/gms/maps/model/BitmapDescriptorFactory#public-static-bitmapdescriptor-defaultmarker-float-hue

  annotation can be one of four possible MKAnnotation subclasses, for each of them queue is checked if it contains
  the particular instance
 */
fun provideDescriptor(localUri: String?, color: Double): BitmapDescriptor {
  val hueWheelMaxValue = 360

  return if (localUri != null) {
    BitmapDescriptorFactory.fromPath(localUri)
  } else {
    BitmapDescriptorFactory.defaultMarker((color % hueWheelMaxValue).toFloat())
  }
}
