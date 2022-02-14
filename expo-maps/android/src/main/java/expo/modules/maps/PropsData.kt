package expo.modules.maps

import android.graphics.Color
import com.google.android.gms.maps.model.Cap
import com.google.android.gms.maps.model.JointType
import com.google.android.gms.maps.model.PatternItem
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

enum class MapType(val value: String) {
  Normal("normal"),
  Hybrid("hybrid"),
  Satellite("satellite"),
  Terrain("terrain")
}

data class MarkerObject(
  @Field val latitude: Double = 0.0,
  @Field val longitude: Double = 0.0,
  @Field val title: String? = null,
  @Field val snippet: String? = null,
  @Field val icon: String? = null,
  @Field val defaultMarkerColor: Double = 0.0,
  @Field val draggable: Boolean = false,
  @Field val anchorU: Double? = null,
  @Field val anchorV: Double? = null,
  @Field val opacity: Double = 1.0,
) : Record

data class Point(@Field val latitude: Double = 0.0, @Field val longitude: Double = 0.0) : Record

data class PolygonObject(
  @Field val points: Array<Point> = emptyArray(),
  @Field val fillColor: Int?,
  @Field val strokeColor: Int?,
  @Field val strokeWidth: Float?,
  @Field val strokePattern: List<PatternItem>?,
  @Field val jointType: Int?,
) : Record

data class PolylineObject(
  @Field val points: Array<Point> = emptyArray(),
  @Field val color: Int?,
  @Field val width: Float?,
  @Field val pattern: List<PatternItem>?,
  @Field val jointType: Int?,
  @Field val capType: Cap?,
) : Record
