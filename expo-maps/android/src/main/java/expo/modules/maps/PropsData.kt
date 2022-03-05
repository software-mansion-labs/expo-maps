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
  @Field val anchorU: Double? = null,
  @Field val anchorV: Double? = null,
  @Field val opacity: Double = 1.0,
) : Record

data class Point(@Field val latitude: Double = 0.0, @Field val longitude: Double = 0.0) : Record

data class PolygonObject(@Field val points: Array<Point> = emptyArray()) : Record

data class PolylineObject(@Field val points: Array<Point> = emptyArray()) : Record

data class CameraPosition(
        @Field val latitude: Double = 0.0,
        @Field val longitude: Double = 0.0,
        @Field val zoom: Double = 0.0,
        @Field val animate: Boolean = false
) : Record
