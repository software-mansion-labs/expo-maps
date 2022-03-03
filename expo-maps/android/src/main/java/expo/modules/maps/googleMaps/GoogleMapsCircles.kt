package expo.modules.maps.googleMaps

import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.Circle
import com.google.android.gms.maps.model.CircleOptions
import com.google.android.gms.maps.model.LatLng
import expo.modules.maps.CircleObject
import expo.modules.maps.interfaces.Circles

class GoogleMapsCircles(map: GoogleMap) : Circles {
  private val circles = mutableListOf<Circle>()
  private var googleMap: GoogleMap = map

  override fun setCircles(circleObjects: Array<CircleObject>) {
    detachAndDeleteCircles()
    for (circleObject in circleObjects) {
      val circleOptions = CircleOptions()
      circleOptions.center(LatLng(circleObject.center.latitude, circleObject.center.longitude))
      circleOptions.radius(circleObject.radius)
      circleObject.fillColor?.let { circleOptions.fillColor(it) }
      circleObject.strokeColor?.let { circleOptions.strokeColor(it) }
      circleObject.strokeWidth?.let { circleOptions.strokeWidth(it) }
      val circle = googleMap.addCircle(circleOptions)
      circles.add(circle)
    }
  }

  override fun detachAndDeleteCircles() {
    for (circle in circles) {
      circle.remove()
    }
    circles.clear()
  }
}
