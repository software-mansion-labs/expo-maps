package expo.modules.maps.googleMaps

import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.maps.android.data.geojson.*
import expo.modules.maps.GeoJsonObject
import expo.modules.maps.interfaces.GeoJsons
import org.json.JSONObject

class GoogleMapsGeoJsons(private val map: GoogleMap) : GeoJsons {
  private val layers = mutableListOf<GeoJsonLayer>()

  override fun setGeoJsons(geoJsonObjects: Array<GeoJsonObject>) {
    deleteGeoJsons()
    geoJsonObjects.forEach { geoJsonObject ->
      val geoJsonData = JSONObject(geoJsonObject.geoJsonString)
      val layer = GeoJsonLayer(map, geoJsonData)
      setDefaultStyleForLayer(geoJsonObject, layer)

      for (feature in layer.features) {
        setPolygonFeatureStyle(feature, layer)
        setPolylineFeatureStyle(feature, layer)
        setMarkerFeatureStyle(feature, layer)
      }

      layer.addLayerToMap()
      layers.add(layer)
    }
  }

  private fun deleteGeoJsons() {
    layers.forEach { it.removeLayerFromMap() }
    layers.clear()
  }

  private fun setPolygonFeatureStyle(feature: GeoJsonFeature, layer: GeoJsonLayer) {
    val polygonStyle = GeoJsonPolygonStyle()

    if (feature.hasProperty("strokeColor")) {
      polygonStyle.strokeColor = colorStringToARGBInt(feature.getProperty("strokeColor"))
    } else {
      polygonStyle.strokeColor = layer.defaultPolygonStyle.strokeColor
    }

    if (feature.hasProperty("fillColor")) {
      polygonStyle.fillColor = colorStringToARGBInt(feature.getProperty("fillColor"))
    } else {
      polygonStyle.fillColor = layer.defaultPolygonStyle.fillColor
    }

    if (feature.hasProperty("strokeWidth")) {
      polygonStyle.strokeWidth = feature.getProperty("strokeWidth").toFloat()
    } else {
      polygonStyle.strokeWidth = layer.defaultPolygonStyle.strokeWidth
    }

    if (feature.hasProperty("strokeJointType")) {
      polygonStyle.strokeJointType = jointTypeStringToInt(feature.getProperty("strokeJointType"))
    } else {
      polygonStyle.strokeJointType = layer.defaultPolygonStyle.strokeJointType
    }

    if (feature.hasProperty("strokePattern")) {
      polygonStyle.strokePattern = patternItemStringToGoogleMapsPatternItemList(feature.getProperty("strokePattern"))
    } else {
      polygonStyle.strokePattern= layer.defaultPolygonStyle.strokePattern
    }
    feature.polygonStyle = polygonStyle
  }

  private fun setPolylineFeatureStyle(feature: GeoJsonFeature, layer: GeoJsonLayer) {
    val polylineStyle = GeoJsonLineStringStyle()

    if (feature.hasProperty("color")) {
      polylineStyle.color = colorStringToARGBInt(feature.getProperty("color"))
    } else {
      polylineStyle.color = layer.defaultLineStringStyle.color
    }

    if (feature.hasProperty("pattern")) {
      polylineStyle.pattern = patternItemStringToGoogleMapsPatternItemList(feature.getProperty("pattern"))
    } else {
      polylineStyle.pattern = layer.defaultLineStringStyle.pattern
    }
    feature.lineStringStyle = polylineStyle
  }

  private fun setMarkerFeatureStyle(feature: GeoJsonFeature, layer: GeoJsonLayer) {
    val markerStyle = GeoJsonPointStyle()
    if (feature.hasProperty("title")) {
      markerStyle.title = feature.getProperty("title")
    } else {
      markerStyle.title = layer.defaultPointStyle.title
    }

    if (feature.hasProperty("snippet")) {
      markerStyle.snippet = feature.getProperty("snippet")
    } else {
      markerStyle.snippet = layer.defaultPointStyle.snippet
    }

    if (feature.hasProperty("color")) {
      markerStyle.icon = BitmapDescriptorFactory
        .defaultMarker(colorStringToHueFloat(feature.getProperty("color")))
    } else {
      markerStyle.icon = layer.defaultPointStyle.icon
    }
    feature.pointStyle = markerStyle
  }

  private fun setDefaultStyleForLayer(geoJsonObject: GeoJsonObject, layer: GeoJsonLayer) {
    if (geoJsonObject.defaultStyle?.marker != null) {
      val defaultMarkerStyle = layer.defaultPointStyle
      geoJsonObject.defaultStyle.marker.title?.let {
        defaultMarkerStyle.title = it
      }
      geoJsonObject.defaultStyle.marker.snippet?.let {
        defaultMarkerStyle.snippet = it
      }
      geoJsonObject.defaultStyle.marker.color?.let {
        defaultMarkerStyle.icon = BitmapDescriptorFactory
          .defaultMarker(colorStringToHueFloat(it))
      }
    }

    if (geoJsonObject.defaultStyle?.polygon != null) {
      val defaultPolygonStyle = layer.defaultPolygonStyle
      geoJsonObject.defaultStyle.polygon.strokeColor?.let {
        defaultPolygonStyle.strokeColor = colorStringToARGBInt(it)
      }
      geoJsonObject.defaultStyle.polygon.fillColor?.let {
        defaultPolygonStyle.fillColor = colorStringToARGBInt(it)
      }
      geoJsonObject.defaultStyle.polygon.strokeWidth?.let {
        defaultPolygonStyle.strokeWidth = it
      }
      geoJsonObject.defaultStyle.polygon.strokeJointType?.let {
        defaultPolygonStyle.strokeJointType = jointTypeStringToInt(it)
      }
      geoJsonObject.defaultStyle.polygon.strokePattern?.let {
        defaultPolygonStyle.strokePattern = it.map(::patternItemToNative)
      }
    }

    if (geoJsonObject.defaultStyle?.polyline != null) {
      val defaultPolylineStyle = layer.defaultLineStringStyle
      geoJsonObject.defaultStyle.polyline.color?.let {
        defaultPolylineStyle.color = colorStringToARGBInt(it)
      }
      geoJsonObject.defaultStyle.polyline.pattern?.let {
        defaultPolylineStyle.pattern = it.map(::patternItemToNative)
      }
    }
  }
}
