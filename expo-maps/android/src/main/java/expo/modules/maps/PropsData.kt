package expo.modules.maps
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

enum class MapType(val value: String) {
    Normal("normal"),
    Hybrid("hybrid"),
    Satellite("satellite"),
    Terrain("terrain")
}

class MarkerObject : Record {
    @Field
    val type: String? = null

    @Field
    val lat: Double? = null

    @Field
    val lng: Double? = null
}
