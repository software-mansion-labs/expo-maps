package expo.modules.maps.googleMaps

import android.content.Context
import android.graphics.Color
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.TileOverlay
import com.google.android.gms.maps.model.TileOverlayOptions
import com.google.maps.android.data.kml.KmlLayer
import com.google.maps.android.heatmaps.Gradient
import com.google.maps.android.heatmaps.HeatmapTileProvider
import com.google.maps.android.heatmaps.WeightedLatLng
import expo.modules.maps.HeatmapObject
import expo.modules.maps.interfaces.Heatmaps

class GoogleMapsHeatmaps(private val context: Context, private val map: GoogleMap) : Heatmaps {

  private val heatmapOverlays = mutableListOf<TileOverlay>()

  override fun setHeatmaps(heatmapObjects: Array<HeatmapObject>) {
    heatmapOverlays.forEach { it.remove() }
    heatmapOverlays.clear()

    for(it in heatmapObjects) {
      var builder = HeatmapTileProvider.Builder()
        .weightedData(it.points.map {
          WeightedLatLng(LatLng(it.latitude, it.longitude), it.data ?: 1.0)
        })
      it.gradient?.let {
        builder = builder.gradient(
          Gradient(
            it.colors.map { colorStringtoInt(it) }.toIntArray(),
            it.locations))
      }
      it.radius.let {
        builder = builder.radius(it ?: 20)
      }
      it.opacity.let {
        builder = builder.opacity(it ?: 1.0)
      }
      var provider = builder.build()
      val tileOverlay = map.addTileOverlay(TileOverlayOptions().tileProvider(provider))
      tileOverlay?.let { heatmapOverlays.add(it) }
    }
  }

  private fun colorStringtoInt(colorString: String): Int {
    return when (colorString.length) {
      4 -> Color.argb(
        0xFF,
        Integer.decode("0x" + colorString[1] + colorString[1]),
        Integer.decode("0x" + colorString[2] + colorString[2]),
        Integer.decode("0x" + colorString[3] + colorString[3]),
      )
      5 -> Color.argb(
        Integer.decode("0x" + colorString[4] + colorString[4]),
        Integer.decode("0x" + colorString[1] + colorString[1]),
        Integer.decode("0x" + colorString[2] + colorString[2]),
        Integer.decode("0x" + colorString[3] + colorString[3]),
      )
      7 -> Color.argb(
        0xFF,
        Integer.decode("0x" + colorString.substring(1..2)),
        Integer.decode("0x" + colorString.substring(3..4)),
        Integer.decode("0x" + colorString.substring(5..6)),
      )
      9 -> Color.argb(
        Integer.decode("0x" + colorString.substring(7..8)),
        Integer.decode("0x" + colorString.substring(1..2)),
        Integer.decode("0x" + colorString.substring(3..4)),
        Integer.decode("0x" + colorString.substring(5..6)),
      )
      else -> throw IllegalArgumentException("String $colorString is not a valid color representation")
    }
  }
}
