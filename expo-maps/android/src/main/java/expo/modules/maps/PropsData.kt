package expo.modules.maps

import com.google.android.gms.maps.model.LatLng
import com.google.maps.android.clustering.ClusterItem
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

enum class MapType(val value: String) {
  Normal("normal"),
  Hybrid("hybrid"),
  Satellite("satellite"),
  Terrain("terrain"),
}

data class MarkerObject(
  @Field val latitude: Double = 0.0,
  @Field val longitude: Double = 0.0,
  @Field val markerTitle: String? = null,
  @Field val markerSnippet: String? = null,
  @Field val icon: String? = null,
  @Field val color: Double = 0.0,
  @Field val draggable: Boolean = false,
  @Field val anchorU: Double? = null,
  @Field val anchorV: Double? = null,
  @Field val opacity: Double = 1.0,
) : Record, ClusterItem {

  override fun getPosition(): LatLng {
    return LatLng(latitude, longitude)
  }

  override fun getTitle(): String? {
    return markerTitle
  }

  override fun getSnippet(): String? {
    return markerSnippet
  }
}

data class Point(@Field val latitude: Double = 0.0, @Field val longitude: Double = 0.0) : Record

data class PolygonObject(
  @Field val points: List<Point> = emptyList(),
  @Field val fillColor: String?,
  @Field val strokeColor: String?,
  @Field val strokeWidth: Float?,
  @Field val strokePattern: List<PatternItem>?,
  @Field val jointType: Int?,
) : Record

data class CameraPosition(
  @Field val latitude: Double = 0.0,
  @Field val longitude: Double = 0.0,
  @Field val zoom: Double = 0.0,
  @Field val animate: Boolean = false,
) : Record

data class PolylineObject(
  @Field val points: List<Point> = emptyList(),
  @Field val color: String?,
  @Field val width: Float?,
  @Field val pattern: List<PatternItem>?,
  @Field val jointType: Joint?,
  @Field val capType: Cap?,
) : Record

data class PatternItem(
  @Field val type: PatternItemType,
  @Field val length: Float,
) : Record

enum class PatternItemType(val value: String) {
  Stroke("stroke"),
  Gap("gap"),
}

enum class Joint(val value: String) {
  Bevel("bevel"),
  Miter("miter"),
  Round("round"),
}

enum class Cap(val value: String) {
  Butt("butt"),
  Round("round"),
  Square("square"),
}

data class CircleObject(
  @Field val center: Point,
  @Field val radius: Double,
  @Field val strokeColor: String?,
  @Field val strokeWidth: Float?,
  @Field val fillColor: String?,
) : Record

data class ClusterObject(
  @Field val name: String = "default_cluster",
  @Field val minimumClusterSize: Int = 2,
  @Field val markerTitle: String? = null,
  @Field val markerSnippet: String? = null,
  @Field val icon: String? = null,
  @Field val color: Double = 0.0,
  @Field val opacity: Double = 1.0,
  @Field val markers: List<MarkerObject> = emptyList(),
) : Record
