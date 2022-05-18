import ExpoModulesCore

public class ExpoAppleMapsModule: Module {

  public func definition() -> ModuleDefinition {
    name("ExpoAppleMaps")

    viewManager {
      view {
        AppleMapsView()
      }

      prop("showCompass") { (view: AppleMapsView, enable: Bool) in
        view.setShowCompass(enable: enable)
      }

      prop("showMyLocationButton") { (view: AppleMapsView, enable: Bool) in
        view.setShowMyLocationButton(enable: enable)
      }

      prop("showLevelPicker") { (view: AppleMapsView, enable: Bool) in
        view.setShowLevelPicker(enable: enable)
      }

      prop("enableRotateGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledRotateGestures(enabled: enable)
      }

      prop("enableScrollGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledScrollGestures(enabled: enable)
      }

      prop("enableTiltGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledTiltGestures(enabled: enable)
      }

      prop("enableZoomGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledZoomGestures(enabled: enable)
      }

      prop("mapType") { (view: AppleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }

      prop("markers") { (view: AppleMapsView, markerObjects: [MarkerObject]) in
        view.setMarkers(markerObjects: markerObjects)
      }
      
      prop("clusters") { (view: AppleMapsView, clusterObjects: [ClusterObject]) in
        view.setClusters(clusterObjects: clusterObjects)
      }

      prop("polygons") { (view: AppleMapsView, polygonObjects: [PolygonObject]) in
        view.setPolygons(polygonObjects: polygonObjects)
      }

      prop("polylines") { (view: AppleMapsView, polylineObjects: [PolylineObject]) in
        view.setPolylines(polylineObjects: polylineObjects)
      }

      prop("circles") { (view: AppleMapsView, circleObjects: [CircleObject]) in
        view.setCircles(circleObjects: circleObjects)
      }
      
      prop("initialCameraPosition") { (view: AppleMapsView, cameraPosition: CameraPosition) in
        view.setInitialCameraPosition(initialCameraPosition: cameraPosition)
      }
      
      prop("enableTraffic") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledTraffic(enableTraffic: enable)
      }
      
      prop("kmls") { (view: AppleMapsView, kmlObjects: [KMLObject]) in
        view.setKMLs(kmlObjects: kmlObjects)
      }
      
      prop("geojsons") { (view: AppleMapsView, geoJsonObjects: [GeoJsonObject]) in
        view.setGeoJsons(geoJsonObjects: geoJsonObjects)
      }
    }
  }
}
