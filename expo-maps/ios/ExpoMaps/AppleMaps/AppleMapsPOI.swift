import MapKit

class AppleMapsPOI: NSObject {
  
  private let mapView: MKMapView
  private let markers: AppleMapsMarkers
  private var searchService: AppleMapsPOISearch
  private var searchControllerView: AppleMapsPOISearchController?
  private var poiFilterCategories: [MKPointOfInterestCategory] = []
  
  private var POIFilters: [MKPointOfInterestCategory]?
  
  init(mapView: MKMapView, markers: AppleMapsMarkers) {
    self.mapView = mapView
    self.markers = markers
    searchService = AppleMapsPOISearch(mapView: mapView, markers: markers)
  }
  
  func setEnabledPOISearching(enabled: Bool) {
    if (enabled) {
      searchControllerView = AppleMapsPOISearchController(searchService: searchService)
      searchControllerView?.enablePOISearchController(mapView: mapView)
    } else {
      searchControllerView = nil
    }
  }
  
  @available(iOS 13.0, *)
  func setEnabledPOIFilter(categories: [POICategoryType]) {
    if categories.isEmpty {
      return;
    }
    let categories = categories.compactMap {item -> MKPointOfInterestCategory? in
      var category: MKPointOfInterestCategory
      switch item {
      case .atm:
        category = MKPointOfInterestCategory.atm
      case .airport:
        category = MKPointOfInterestCategory.airport
      case.parking:
        category = MKPointOfInterestCategory.parking
      }
      return category
    }
    searchService.setPOIFilterCategories(categories: categories)
  }
  
  @available(iOS 14.0, *)
  func setEnabledShowPOI(enabled: Bool) {
    if (enabled) {
      searchService.createSearchRequest()
    } else {
      markers.setMarkers(markerObjects: [])
    }
  }
}

