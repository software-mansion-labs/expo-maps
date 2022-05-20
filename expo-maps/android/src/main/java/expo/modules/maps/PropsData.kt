package expo.modules.maps

import android.graphics.LinearGradient
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
  @Field val color: String? = null,
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

data class PointWithData(
  @Field val latitude: Double = 0.0,
  @Field val longitude: Double = 0.0,
  @Field val data: Double? = null
) : Record

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
  @Field val color: String? = null,
  @Field val opacity: Double = 1.0,
  @Field val markers: List<MarkerObject> = emptyList(),
) : Record

data class KMLObject(@Field val filePath: String) : Record

<<<<<<< HEAD
data class GeoJsonObject(
  @Field val geoJsonString: String,
  @Field val defaultStyle: GeoJsonObjectDefaultStyle?
) : Record

data class GeoJsonObjectDefaultStyle(
  @Field val polygon: GeoJsonObjectDefaultStylePolygon?,
  @Field val polyline: GeoJsonObjectDefaultStylePolyline?,
  @Field val marker: GeoJsonObjectDefaultStyleMarker?
) : Record

data class GeoJsonObjectDefaultStylePolygon(
  @Field val fillColor: String?,
  @Field val strokeColor: String?,
  @Field val strokeWidth: Float?,
  @Field val strokeJointType: String?,
  @Field val strokePattern: List<PatternItem>?
) : Record

data class GeoJsonObjectDefaultStylePolyline(
  @Field val color: String?,
  @Field val pattern: List<PatternItem>?
) : Record

data class GeoJsonObjectDefaultStyleMarker(
  @Field val color: String?,
  @Field val title: String?,
  @Field val snippet: String?
) : Record

=======
data class Gradient(
  @Field val colors: List<String> = emptyList(),
  @Field val locations: FloatArray = floatArrayOf(),
) : Record {
  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (javaClass != other?.javaClass) return false

    other as Gradient

    if (colors != other.colors) return false
    if (!locations.contentEquals(other.locations)) return false

    return true
  }

  override fun hashCode(): Int {
    var result = colors.hashCode()
    result = 31 * result + locations.contentHashCode()
    return result
  }
}

data class HeatmapObject(
  @Field val points: List<PointWithData> = emptyList(),
  @Field val radius: Int?,
  @Field val gradient: Gradient? = null,
  @Field val opacity: Double?,
<<<<<<< HEAD
)
>>>>>>> 7d3c60e (Add implementation for heatmaps)
=======
) : Record
>>>>>>> a427a98 (Fix type problems)
