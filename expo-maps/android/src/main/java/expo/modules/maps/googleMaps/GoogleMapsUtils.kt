package expo.modules.maps.googleMaps

import com.google.android.gms.maps.model.BitmapDescriptor
import com.google.android.gms.maps.model.BitmapDescriptorFactory

fun provideDescriptor(localUri: String?, color: Double): BitmapDescriptor {
  val hueWheelMaxValue = 360

  return if (localUri != null) {
    BitmapDescriptorFactory.fromPath(localUri)
  } else {
    BitmapDescriptorFactory.defaultMarker((color % hueWheelMaxValue).toFloat())
  }
}
