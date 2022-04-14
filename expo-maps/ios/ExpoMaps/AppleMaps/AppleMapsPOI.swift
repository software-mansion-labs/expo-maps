import MapKit

class AppleMapsPOI: NSObject {
  
  private let mapView: MKMapView
  private var markers: AppleMapsMarkers
  private var searchControllerView: AppleMapsPOISearchController?
  private var search: AppleMapsPOISearch
  
  private var POIFilters: [MKPointOfInterestCategory]?
  
  init(mapView: MKMapView, markers: AppleMapsMarkers) {
    self.markers = markers
    self.mapView = mapView
    search = AppleMapsPOISearch(mapView: mapView, markers: markers)
  }
  
  func enablePOISearching(enabled: Bool) {
    if (enabled) {
      searchControllerView = AppleMapsPOISearchController(mapView: mapView, search: search)
      searchControllerView?.enableSearchingForPOI()
    }
  }
  
  @available(iOS 14.0, *)
  func displayFilteredPOI() {
    let bar = UIToolbar(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: 50))
    mapView.addSubview(bar)
    let button = UIBarButtonItem(title: "Display POIS", style: UIBarButtonItem.Style.plain, target: self, action: #selector(action))
    let button2 = UIBarButtonItem(title: "Search for POIS", style: UIBarButtonItem.Style.plain, target: self, action: #selector(action2))

    bar.setItems([button, button2], animated: false)
  }
  
  @available(iOS 14.0, *)
  @objc
  private func action(sender: UIBarButtonItem) {
    displayPOI()
  }
  
  @available(iOS 14.0, *)
  @objc
  private func action2(sender: UIBarButtonItem) {
    enablePOISearching(enabled: true)
  }
  
  @available(iOS 14.0, *)
  private func displayPOI() {
    let poiFilters = mapToMKPointOfInterestCategory(items: ["stkdjd"])
    let request = MKLocalPointsOfInterestRequest(coordinateRegion: mapView.region)
    request.pointOfInterestFilter = MKPointOfInterestFilter(including: poiFilters)
    search.search(using: request)
  }
        
  @available(iOS 13.0, *)
  private func mapToMKPointOfInterestCategory(items: [String]) -> [MKPointOfInterestCategory] {
    return [MKPointOfInterestCategory.atm]
  }
}

