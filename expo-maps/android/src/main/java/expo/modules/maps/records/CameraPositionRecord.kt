package expo.modules.maps.records

import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class CameraPositionRecord(cameraPosition: CameraPosition) : Record {

  @Field
  var target: LatLngRecord = LatLngRecord(LatLng(0.0, 0.0))

  @Field
  var zoom: Float = 0.0f

  @Field
  var bearing: Float = 0.0f

  @Field
  var tilt: Float = 0.0f

  init {
    target = LatLngRecord(cameraPosition.target)
    zoom = cameraPosition.zoom
    bearing = cameraPosition.bearing
    tilt = cameraPosition.tilt
  }

}