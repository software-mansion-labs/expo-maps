package expo.modules.maps.googleMaps

import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Polygon
import com.google.android.gms.maps.model.PolygonOptions
import expo.modules.maps.PolygonObject
import expo.modules.maps.interfaces.Polygons

class GoogleMapsPolygons(map: GoogleMap) : Polygons {
  private val polygons = mutableListOf<Polygon>()
  private var googleMap: GoogleMap = map

  override fun setPolygons(polygonObjects: Array<PolygonObject>) {
    detachAndDeletePolygons()
    for (polygonObject in polygonObjects) {
      val polygonOptions = PolygonOptions()
      for (point in polygonObject.points) {
        polygonOptions.add(LatLng(point.latitude, point.longitude))
      }
      val polygon = googleMap.addPolygon(polygonOptions)
      polygons.add(polygon)
    }
  }

  override fun detachAndDeletePolygons() {
    for (polygon in polygons) {
      polygon.remove()
    }
    polygons.clear()
  }
}
