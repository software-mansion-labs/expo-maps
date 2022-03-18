package expo.modules.maps.googleMaps

import android.content.Context
import android.graphics.Color
import android.net.Uri
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.model.*
import com.google.maps.android.clustering.Cluster
import com.google.maps.android.clustering.ClusterManager
import com.google.maps.android.clustering.view.DefaultClusterRenderer
import expo.modules.maps.ClusterObject
import expo.modules.maps.MarkerObject
import expo.modules.maps.interfaces.Clusters

class GoogleMapsClusters(private val context: Context, private val map: GoogleMap) : Clusters {
  private val clusters: MutableList<ExpoClusterManager> = mutableListOf()

  override fun setClusters(clusterObjects: Array<ClusterObject>) {
    clusters.forEach {
      it.clearItems()
      it.cluster()
    }

    clusters.clear()

    clusterObjects.forEach { clusterObject ->
      val clusterManager = ExpoClusterManager(
        clusterObject.minimumClusterSize,
        clusterObject.markerTitle,
        clusterObject.markerSnippet,
        clusterObject.icon,
        clusterObject.color,
        clusterObject.opacity
      )

      clusterManager.addItems(clusterObject.markers)
      clusterManager.cluster()
      clusters.add(clusterManager)
    }

    // Point the map's listeners at the listeners implemented by the cluster managers.
    map.setOnCameraIdleListener {
      clusters.forEach {
        it.onCameraIdle()
      }
    }
  }

  private inner class ExpoClusterManager(
    val minimumClusterSize: Int,
    val title: String?,
    val snippet: String?,
    val icon: String?,
    val color: Double,
    val opacity: Double
  ) : ClusterManager<MarkerObject>(context, map) {

    init {
      renderer = ExpoClusterRenderer(this)
    }
  }

  private inner class ExpoClusterRenderer(
    private val clusterManager: ExpoClusterManager
  ) : DefaultClusterRenderer<MarkerObject>(context, map, clusterManager) {

    init {
      minClusterSize = clusterManager.minimumClusterSize
    }

    override fun getColor(clusterSize: Int): Int {
      val hueWheelMaxValue = 360
      return Color.HSVToColor(floatArrayOf((clusterManager.color % hueWheelMaxValue).toFloat(), 1f, 1f))
    }

    override fun onBeforeClusterItemRendered(item: MarkerObject, markerOptions: MarkerOptions) {
      val localUri = item.icon?.let { Uri.parse(it)?.path }
      markerOptions
        .position(LatLng(item.latitude, item.longitude))
        .title(item.markerTitle)
        .snippet(item.markerSnippet)
        .draggable(item.draggable)
        .anchor((item.anchorU ?: 0.5).toFloat(), (item.anchorV ?: 1).toFloat())
        .alpha(item.opacity.toFloat())
        .icon(provideDescriptor(localUri, item.color))
    }

    override fun onClusterItemUpdated(item: MarkerObject, marker: Marker) {
      val localUri = item.icon?.let { Uri.parse(it)?.path }
      marker.position = LatLng(item.latitude, item.longitude)
      marker.title = item.markerTitle
      marker.snippet = item.markerSnippet
      marker.isDraggable = item.draggable
      marker.setAnchor((item.anchorU ?: 0.5).toFloat(), (item.anchorV ?: 1).toFloat())
      marker.alpha = item.opacity.toFloat()
      marker.setIcon(provideDescriptor(localUri, item.color))
    }

    override fun onBeforeClusterRendered(
      cluster: Cluster<MarkerObject>,
      markerOptions: MarkerOptions
    ) {
      markerOptions
        .title(clusterManager.title)
        .snippet(clusterManager.snippet)
        .alpha(clusterManager.opacity.toFloat())

      val localUri = clusterManager.icon?.let { Uri.parse(it)?.path }
      if (localUri != null) {
        markerOptions.icon(BitmapDescriptorFactory.fromPath(localUri))
      } else {
        markerOptions.icon(getDescriptorForCluster(cluster))
      }
    }

    override fun onClusterUpdated(cluster: Cluster<MarkerObject>, marker: Marker) {
      marker.title = clusterManager.title
      marker.snippet = clusterManager.snippet
      marker.alpha = clusterManager.opacity.toFloat()

      val localUri = clusterManager.icon?.let { Uri.parse(it)?.path }
      if (localUri != null) {
        marker.setIcon(BitmapDescriptorFactory.fromPath(localUri))
      } else {
        marker.setIcon(getDescriptorForCluster(cluster))
      }
    }
  }
}
