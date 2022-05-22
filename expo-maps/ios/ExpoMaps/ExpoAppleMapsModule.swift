import ExpoModulesCore
import simd

public class ExpoAppleMapsModule: Module {

  public func definition() -> ModuleDefinition {
    Name("ExpoAppleMaps")
    
    function("getSearchCompletions") { (viewHandle: Int) -> Int in
      print(viewHandle)
      var result: [String] = ["empty results"] {
        willSet {
          print("NEW VALUE: \(newValue)")
        }
      }
      DispatchQueue.main.async {
        let view = self.appContext?.reactBridge?.uiManager?.view(forReactTag: NSNumber(value: viewHandle)) as? AppleMapsView
        result = view?.getPOISearchCompletions(searchQueryFragment: "Air") ?? []
      }
      print ("RESULT \(result)")
      return 123
     }

    ViewManager {
      View {
        AppleMapsView()
      }

      Prop("showCompass") { (view: AppleMapsView, enable: Bool) in
        view.setShowCompass(enable: enable)
      }

      Prop("showMyLocationButton") { (view: AppleMapsView, enable: Bool) in
        view.setShowMyLocationButton(enable: enable)
      }

      Prop("showLevelPicker") { (view: AppleMapsView, enable: Bool) in
        view.setShowLevelPicker(enable: enable)
      }

      Prop("enableRotateGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledRotateGestures(enabled: enable)
      }

      Prop("enableScrollGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledScrollGestures(enabled: enable)
      }

      Prop("enableTiltGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledTiltGestures(enabled: enable)
      }

      Prop("enableZoomGestures") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledZoomGestures(enabled: enable)
      }

      Prop("mapType") { (view: AppleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }

      Prop("markers") { (view: AppleMapsView, markerObjects: [MarkerObject]) in
        view.setMarkers(markerObjects: markerObjects)
      }
      
      Prop("clusters") { (view: AppleMapsView, clusterObjects: [ClusterObject]) in
        view.setClusters(clusterObjects: clusterObjects)
      }

      Prop("polygons") { (view: AppleMapsView, polygonObjects: [PolygonObject]) in
        view.setPolygons(polygonObjects: polygonObjects)
      }

      Prop("polylines") { (view: AppleMapsView, polylineObjects: [PolylineObject]) in
        view.setPolylines(polylineObjects: polylineObjects)
      }

      Prop("circles") { (view: AppleMapsView, circleObjects: [CircleObject]) in
        view.setCircles(circleObjects: circleObjects)
      }
      
      Prop("initialCameraPosition") { (view: AppleMapsView, cameraPosition: CameraPosition) in
        view.setInitialCameraPosition(initialCameraPosition: cameraPosition)
      }
      
      Prop("enableTraffic") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledTraffic(enableTraffic: enable)
      }
      
      Prop("kmls") { (view: AppleMapsView, kmlObjects: [KMLObject]) in
        view.setKMLs(kmlObjects: kmlObjects)
      }
      
      Prop("geojsons") { (view: AppleMapsView, geoJsonObjects: [GeoJsonObject]) in
        view.setGeoJsons(geoJsonObjects: geoJsonObjects)
      }
      
      prop("enablePOISearching") { (view: AppleMapsView, enable: Bool) in
        view.setEnabledPOISearching(enabled: enable)
      }
      
      prop("enablePOIFilter") { (view: AppleMapsView, categories: [POICategoryType]) in
        view.setEnabledPOIFilter(categories: categories)
      }
      
      prop("enablePOIDisplay") { (view: AppleMapsView, enabled: Bool) in
        view.setEnabledShowPOI(enabled: enabled)
      }
      
    }
  }
}
