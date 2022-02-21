package expo.modules.maps

import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.*

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
        polylineOptions.pattern(polylineObject.pattern.map(::patternItemToNative))
      }
      if (polylineObject.jointType != null) {
        polylineOptions.jointType(jointToNative(polylineObject.jointType))
      }
      if (polylineObject.capType != null) {
        polylineOptions.startCap(capToNative(polylineObject.capType))
        polylineOptions.endCap(capToNative(polylineObject.capType))
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

  private fun capToNative(cap: Cap) :com.google.android.gms.maps.model.Cap {
    return when (cap) {
      Cap.butt -> ButtCap()
      Cap.round -> RoundCap()
      Cap.square -> SquareCap()
    }
  }
}
