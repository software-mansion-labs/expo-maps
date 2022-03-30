package expo.modules.maps.googleMaps

import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.maps.android.data.geojson.GeoJsonLayer
import com.google.maps.android.data.geojson.GeoJsonLineStringStyle
import com.google.maps.android.data.geojson.GeoJsonPointStyle
import com.google.maps.android.data.geojson.GeoJsonPolygonStyle
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
            for (feature in layer.features) {
                val polygonStyle = GeoJsonPolygonStyle()
                if (feature.hasProperty("strokeColor")) {
                    polygonStyle.strokeColor = colorStringToARGBInt(feature.getProperty("strokeColor"))
                }
                if (feature.hasProperty("fillColor")) {
                    polygonStyle.fillColor = colorStringToARGBInt(feature.getProperty("fillColor"))
                }
                if (feature.hasProperty("strokeWidth")) {
                    polygonStyle.strokeWidth = feature.getProperty("strokeWidth").toFloat()
                }
                if (feature.hasProperty("strokeJointType")) {
                    polygonStyle.strokeJointType = jointTypeStringToInt(feature.getProperty("strokeJointType"))
                }
                if (feature.hasProperty("strokePattern")) {
                    polygonStyle.strokePattern = patternItemStringToGoogleMapsPatternItemList(feature.getProperty("strokePattern"))
                }
                feature.polygonStyle = polygonStyle

                val polylineStyle = GeoJsonLineStringStyle()
                if (feature.hasProperty("color")) {
                    polylineStyle.color = colorStringToARGBInt(feature.getProperty("color"))
                }
                if (feature.hasProperty("pattern")) {
                    polylineStyle.pattern = patternItemStringToGoogleMapsPatternItemList(feature.getProperty("pattern"))
                }
                feature.lineStringStyle = polylineStyle

                val markerStyle = GeoJsonPointStyle()
                if (feature.hasProperty("title")) {
                    markerStyle.title = feature.getProperty("title")
                }
                if (feature.hasProperty("snippet")) {
                    markerStyle.snippet = feature.getProperty("snippet")
                }
                if (feature.hasProperty("color")) {
                    markerStyle.icon = BitmapDescriptorFactory
                            .defaultMarker(colorStringToHueFloat(feature.getProperty("color")))
                }
                feature.pointStyle = markerStyle
            }
            layer.addLayerToMap()
            layers.add(layer)
        }
    }

    private fun deleteGeoJsons() {
        layers.forEach { it.removeLayerFromMap() }
        layers.clear()
    }
}
