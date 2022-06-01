package expo.modules.maps.interfaces

import expo.modules.maps.*

interface ExpoMapView {
  fun setMapType(mapType: MapType)
  fun setMarkers(markerObjects: Array<MarkerObject>)
  fun setPolygons(polygonObjects: Array<PolygonObject>)
  fun setPolylines(polylineObjects: Array<PolylineObject>)
  fun setCircles(circleObjects: Array<CircleObject>)
  fun setClusters(clusterObjects: Array<ClusterObject>)
  fun setEnabledTraffic(enableTraffic: Boolean)
  fun setKMLs(kmlObjects: Array<KMLObject>)
  fun setGeoJsons(geoJsonObjects: Array<GeoJsonObject>)
  fun setInitialCameraPosition(initialCameraPosition: CameraPosition)
  fun setOverlays(overlayObjects: Array<OverlayObject>)
}
