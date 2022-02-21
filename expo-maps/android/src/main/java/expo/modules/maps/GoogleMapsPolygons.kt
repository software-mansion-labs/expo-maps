package expo.modules.maps

import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.*

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
      if (polygonObject.fillColor != null) {
        polygonOptions.fillColor(polygonObject.fillColor)
      }
      if (polygonObject.strokeColor != null) {
        polygonOptions.strokeColor(polygonObject.strokeColor)
      }
      if (polygonObject.strokeWidth != null) {
        polygonOptions.strokeWidth(polygonObject.strokeWidth)
      }
      if (polygonObject.strokePattern != null) {
        polygonOptions.strokePattern(polygonObject.strokePattern.map(::patternItemToNative))
      }
      if(polygonObject.jointType != null){
        polygonOptions.strokeJointType(polygonObject.jointType)
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

  private fun patternItemToNative(patternItem: PatternItem) :com.google.android.gms.maps.model.PatternItem {
    return when (patternItem.type) {
      PatternItemType.gap -> Gap(patternItem.length)
      PatternItemType.stroke -> when (patternItem.length) {
        0F, -0F -> Dot()
        else -> Dash(patternItem.length)
      }
    }
  }

  private fun jointToNative(joint: Joint) :Int {
    return when (joint) {
      Joint.miter -> JointType.DEFAULT
      Joint.bevel -> JointType.BEVEL
      Joint.round -> JointType.ROUND
    }
  }
}
