package expo.modules.maps.googleMaps

import android.graphics.Color
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.*
import expo.modules.maps.*
import expo.modules.maps.Cap
import expo.modules.maps.PatternItem
import expo.modules.maps.interfaces.Polylines

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
      polylineObject.color?.let { polylineOptions.color(colorStringtoInt(it)) }
      polylineObject.width?.let { polylineOptions.width(it) }
      polylineObject.pattern?.let { polylineOptions.pattern(it.map(::patternItemToNative)) }
      polylineObject.jointType?.let { polylineOptions.jointType(jointToNative(it)) }
      polylineObject.capType?.let {
        polylineOptions.startCap(capToNative(it))
        polylineOptions.endCap(capToNative(it))
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

  private fun capToNative(cap: Cap): com.google.android.gms.maps.model.Cap {
    return when (cap) {
      Cap.butt -> ButtCap()
      Cap.round -> RoundCap()
      Cap.square -> SquareCap()
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
