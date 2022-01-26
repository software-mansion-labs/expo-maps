package expo.modules.maps
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

enum class MapType(val value: String) {
    Normal("normal"),
    Hybrid("hybrid"),
    Satellite("satellite"),
    Terrain("terrain")
}

data class MarkerObject( @Field val latitude: Double = 0.0, @Field val longitude: Double = 0.0) : Record {}
