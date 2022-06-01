import ExpoModulesCore

public class ExpoGoogleMapsModule: Module {

  public func definition() -> ModuleDefinition {
    Name("ExpoGoogleMaps")

    ViewManager {
      View {
        GoogleMapsView()
      }

      Prop("showCompass") { (view: GoogleMapsView, enable: Bool) in
        view.setShowCompass(enable: enable)
      }

      Prop("showMyLocationButton") { (view: GoogleMapsView, enable: Bool) in
        view.setShowMyLocationButton(enable: enable)
      }

      Prop("showLevelPicker") { (view: GoogleMapsView, enable: Bool) in
        view.setShowLevelPicker(enable: enable)
      }

      Prop("enableRotateGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledRotateGestures(enabled: enable)
      }

      Prop("enableScrollGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledScrollGestures(enabled: enable)
      }

      Prop("enableTiltGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledTiltGestures(enabled: enable)
      }

      Prop("enableZoomGestures") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledZoomGestures(enabled: enable)
      }

      Prop("mapType") { (view: GoogleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }

      Prop("googleMapsJsonStyleString") { (view: GoogleMapsView, jsonStyleString: String) in
        view.setMapStyle(jsonStyleString: jsonStyleString)
      }

      Prop("markers") { (view: GoogleMapsView, markerObjects: [MarkerObject]) in
        view.setMarkers(markerObjects: markerObjects)
      }
      
      Prop("clusters") { (view: GoogleMapsView, clusterObjects: [ClusterObject]) in
        view.setClusters(clusterObjects: clusterObjects)
      }

      Prop("polygons") { (view: GoogleMapsView, polygonObjects: [PolygonObject]) in
        view.setPolygons(polygonObjects: polygonObjects)
      }

      Prop("polylines") { (view: GoogleMapsView, polylineObjects: [PolylineObject]) in
        view.setPolylines(polylineObjects: polylineObjects)
      }

      Prop("initialCameraPosition") { (view: GoogleMapsView, cameraPosition: CameraPosition) in
        view.setInitialCameraPosition(initialCameraPosition: cameraPosition)
      }

      Prop("circles") { (view: GoogleMapsView, circleObjects: [CircleObject]) in
        view.setCircles(circleObjects: circleObjects)
      }
      
      Prop("enableTraffic") { (view: GoogleMapsView, enable: Bool) in
        view.setEnabledTraffic(enableTraffic: enable)
      }
      
      Prop("kmls") { (view: GoogleMapsView, kmlObjects: [KMLObject]) in
        view.setKMLs(kmlObjects: kmlObjects)
      }
      
      Prop("geojsons") { (view: GoogleMapsView, geoJsonObjects: [GeoJsonObject]) in
        view.setGeoJsons(geoJsonObjects: geoJsonObjects)
      }
      
      Prop("overlays") { (view: GoogleMapsView, overlayObjects: [OverlayObject]) in
        view.setOverlays(overlayObjects: overlayObjects)
      }
    }
  }
}
