import ExpoModulesCore

public class ExpoGoogleMapsModule: Module {

  public func definition() -> ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        GoogleMapsView()
      }

      prop("showCompass") { (view: GoogleMapsView, enable: Bool) in
        view.setShowCompass(enable: enable)
      }

      prop("showMyLocationButton") { (view: GoogleMapsView, enable: Bool) in
        view.setShowMyLocationButton(enable: enable)
      }

      prop("showLevelPicker") { (view: GoogleMapsView, enable: Bool) in
        view.setShowLevelPicker(enable: enable)
      }

      prop("enableRotateGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledRotateGestures(enabled: enable)
      }

      prop("enableScrollGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledScrollGestures(enabled: enable)
      }

      prop("enableTiltGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledTiltGestures(enabled: enable)
      }

      prop("enableZoomGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledZoomGestures(enabled: enable)
      }

      prop("mapType") { (view: GoogleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }

      prop("googleMapsJsonStyleString") { (view: GoogleMapsView, jsonStyleString: String) in
        view.setMapStyle(jsonStyleString: jsonStyleString)
      }

      prop("markers") { (view: GoogleMapsView, markerObjects: [MarkerObject]) in
        view.setMarkers(markerObjects: markerObjects)
      }
      
      prop("clusters") { (view: GoogleMapsView, clusterObjects: [ClusterObject]) in
        view.setClusters(clusterObjects: clusterObjects)
      }

      prop("polygons") { (view: GoogleMapsView, polygonObjects: [PolygonObject]) in
        view.setPolygons(polygonObjects: polygonObjects)
      }

      prop("polylines") { (view: GoogleMapsView, polylineObjects: [PolylineObject]) in
        view.setPolylines(polylineObjects: polylineObjects)
      }

      prop("initialCameraPosition") { (view: GoogleMapsView, cameraPosition: CameraPosition) in
        view.setInitialCameraPosition(initialCameraPosition: cameraPosition)
      }

      prop("circles") { (view: GoogleMapsView, circleObjects: [CircleObject]) in
        view.setCircles(circleObjects: circleObjects)
      }
      
      prop("enableTraffic") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledTraffic(enableTraffic: enable)
      }
      
      prop("kmls") { (view: GoogleMapsView, kmlObjects: [KMLObject]) in
        view.setKMLs(kmlObjects: kmlObjects)
      }
    }
  }
}
