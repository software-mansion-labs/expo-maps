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
    searchControllerView = AppleMapsPOISearchController(searchService: searchService)
  }
  
  func setEnabledPOISearching(enabled: Bool) {
    if (enabled) {
      searchControllerView?.enablePOISearchController(mapView: mapView)
    } else {
      searchControllerView?.disablePOISearchController()
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
      case .airport:
        category = .airport
      case .atm:
        category = .atm
      case .bank:
        category = .bank
      case .beach:
        category = .beach
      case .cafe:
        category = .cafe
      case .hospital:
        category = .hospital
      case .hotel:
        category = .hotel
      case .museum:
        category = .museum
      case .pharmacy:
        category = .pharmacy
      case .store:
        category = .store
      case .zoo:
        category = .zoo
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

