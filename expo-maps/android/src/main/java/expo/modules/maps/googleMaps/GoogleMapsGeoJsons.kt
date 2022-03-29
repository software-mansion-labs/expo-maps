package expo.modules.maps.googleMaps

import com.google.android.gms.maps.GoogleMap
import com.google.maps.android.data.geojson.GeoJsonLayer
import expo.modules.maps.GeoJsonObject
import expo.modules.maps.interfaces.GeoJsons
import org.json.JSONObject

class GoogleMapsGeoJsons(private val map: GoogleMap) : GeoJsons {
    private val layers = mutableListOf<GeoJsonLayer>()

    override fun setGeoJsons(geoJsonObjects: Array<GeoJsonObject>) {
        deleteGeoJsons()
        geoJsonObjects.forEach {
            val geoJsonData = JSONObject(it.geoJsonString)
            val layer = GeoJsonLayer(map, geoJsonData)
            layer.addLayerToMap()
            layers.add(layer)
        }
    }

    private fun deleteGeoJsons() {
        layers.forEach { it.removeLayerFromMap() }
        layers.clear()
    }
}
