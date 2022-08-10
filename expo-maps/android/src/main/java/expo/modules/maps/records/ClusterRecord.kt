package expo.modules.maps.records

import com.google.android.gms.maps.model.LatLng
import com.google.maps.android.clustering.Cluster
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.maps.MarkerObject

class ClusterRecord(cluster: Cluster<MarkerObject>) : Record {
  @Field var position: LatLngRecord = LatLngRecord(cluster.position)
  @Field var items: Collection<MarkerObject> = cluster.items
  @Field var size: Int = cluster.size
}