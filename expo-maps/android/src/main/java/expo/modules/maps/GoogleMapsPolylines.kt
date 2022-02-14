package expo.modules.maps

import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Polyline
import com.google.android.gms.maps.model.PolylineOptions

class GoogleMapsPolylines(map: GoogleMap) : Polylines {
  private val polylines = mutableListOf<Polyline>()
  private var googleMap: GoogleMap = map

  override fun setPolylines(polylineObjects: Array<PolylineObject>) {
    detachAndDeletePolylines()
    for (polylineObject in polylineObjects) {
      val polylineOptions = PolylineOptions()
      for (point in polylineObject.points) {
        polylineOptions.add(LatLng(point.latitude, point.longitude))
      }
      if (polylineObject.color != null) {
        polylineOptions.color(polylineObject.color)
      }
      if (polylineObject.width != null) {
        polylineOptions.width(polylineObject.width)
      }
      if (polylineObject.pattern != null) {
        polylineOptions.pattern(polylineObject.pattern)
      }
      if (polylineObject.jointType != null) {
        polylineOptions.jointType(polylineObject.jointType)
      }
      if (polylineObject.capType != null) {
        polylineOptions.startCap(polylineObject.capType)
        polylineOptions.endCap(polylineObject.capType)
      }
      val polyline = googleMap.addPolyline(polylineOptions)
      polylines.add(polyline)
    }
  }

  override fun detachAndDeletePolylines() {
    for (polyline in polylines) {
      polyline.remove()
    }
    polylines.clear()
  }
}
