package expo.modules.maps.records

import com.google.android.gms.maps.model.PointOfInterest
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class PointOfInterestRecord(pointOfInterest: PointOfInterest) : Record {
  @Field
  var latLng: LatLngRecord = LatLngRecord(pointOfInterest.latLng)

  @Field
  var name: String = pointOfInterest.name

  @Field
  var placeId: String = pointOfInterest.placeId
}
