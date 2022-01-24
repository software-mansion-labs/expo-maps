import ExpoModulesCore

public class ExpoGoogleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    name("ExpoGoogleMaps")

    viewManager {
      view {
        GoogleMapsView()
      }
      prop("mapType") { (view: GoogleMapsView, mapType: MapType) in
        view.setMapType(mapType: mapType)
      }
      prop("jsonStyleString") { (view: GoogleMapsView, jsonStyleString: String) in
        view.setMapStyle(jsonStyleString: jsonStyleString)
      prop("markers") { (view: GoogleMapsView, markerObjects: [MarkerObject]) in
        view.setMarkers(markerObjects: markerObjects)
      }
    }
  }
}
