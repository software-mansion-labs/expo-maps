package expo.modules.maps

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
  @Field val anchorU: Double = 0.5,
  @Field val anchorV: Double = 1.0,
  @Field val opacity: Double = 1.0,
  @Field val zIndex: Double = 0.0
) : Record

data class Point(@Field val latitude: Double = 0.0, @Field val longitude: Double = 0.0) : Record

data class PolygonObject(@Field val points: Array<Point> = emptyArray()) : Record

data class PolylineObject(@Field val points: Array<Point> = emptyArray()) : Record
