package expo.modules.maps.googleMaps

import android.graphics.Color
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.*
import expo.modules.maps.*
import expo.modules.maps.PatternItem
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
      polygonObject.fillColor?.let { polygonOptions.fillColor(colorStringtoInt(it)) }
      polygonObject.strokeColor?.let { polygonOptions.strokeColor(colorStringtoInt(it)) }
      polygonObject.strokeWidth?.let { polygonOptions.strokeWidth(it) }
      polygonObject.strokePattern?.let {
        polygonOptions.strokePattern(it.map(::patternItemToNative))
      }
      polygonObject.jointType?.let { polygonOptions.strokeJointType(it) }

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

  private fun patternItemToNative(patternItem: PatternItem): com.google.android.gms.maps.model.PatternItem {
    return when (patternItem.type) {
      PatternItemType.gap -> Gap(patternItem.length)
      PatternItemType.stroke -> when (patternItem.length) {
        0F, -0F -> Dot()
        else -> Dash(patternItem.length)
      }
    }
  }

  private fun jointToNative(joint: Joint): Int {
    return when (joint) {
      Joint.miter -> JointType.DEFAULT
      Joint.bevel -> JointType.BEVEL
      Joint.round -> JointType.ROUND
    }
  }

  private fun colorStringtoInt(colorString: String): Int {
    return when (colorString.length) {
      4 -> Color.argb(
        0xFF,
        Integer.decode("0x" + colorString[1] + colorString[1]),
        Integer.decode("0x" + colorString[2] + colorString[2]),
        Integer.decode("0x" + colorString[3] + colorString[3]),
      )
      5 -> Color.argb(
        Integer.decode("0x" + colorString[4] + colorString[4]),
        Integer.decode("0x" + colorString[1] + colorString[1]),
        Integer.decode("0x" + colorString[2] + colorString[2]),
        Integer.decode("0x" + colorString[3] + colorString[3]),
      )
      7 -> Color.argb(
        0xFF,
        Integer.decode("0x" + colorString.substring(1..2)),
        Integer.decode("0x" + colorString.substring(3..4)),
        Integer.decode("0x" + colorString.substring(5..6)),
      )
      9 -> Color.argb(
        Integer.decode("0x" + colorString.substring(7..8)),
        Integer.decode("0x" + colorString.substring(1..2)),
        Integer.decode("0x" + colorString.substring(3..4)),
        Integer.decode("0x" + colorString.substring(5..6)),
      )
      else -> throw IllegalArgumentException("String $colorString is not a valid color representation")
    }
  }
}
