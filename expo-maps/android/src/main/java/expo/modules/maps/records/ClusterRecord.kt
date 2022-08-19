package expo.modules.maps.records

import com.google.maps.android.clustering.Cluster
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.maps.MarkerObject

class ClusterRecord(id: String?, cluster: Cluster<MarkerObject>) : Record {
  @Field var id: String? = id
  @Field var position: LatLngRecord = LatLngRecord(cluster.position)
}