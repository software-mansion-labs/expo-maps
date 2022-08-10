package expo.modules.maps.records

import com.google.android.gms.maps.model.Marker
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class MarkerRecord(marker:Marker) : Record {

  @Field
  var id: String = marker.id

  @Field
  var position: LatLngRecord = LatLngRecord(marker.position)
}