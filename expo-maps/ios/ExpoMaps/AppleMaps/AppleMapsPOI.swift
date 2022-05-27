import MapKit
import ExpoModulesCore

class AppleMapsPOI: NSObject {
    
  private var pointsOfInterestSearchCompleter: AppleMapsPOISearchCompleter
  private var pointsOfInterestSearchService: AppleMapsPOISearch
  private var pointsOfInterestSearchController: AppleMapsPOISearchController
  
  private var mapView: MKMapView
  private var markers: AppleMapsMarkers
  
  init(mapView: MKMapView, markers: AppleMapsMarkers) {
    self.mapView = mapView
    self.markers = markers
    
    pointsOfInterestSearchCompleter = AppleMapsPOISearchCompleter(delegate: nil)
    pointsOfInterestSearchService = AppleMapsPOISearch(mapView: mapView, markers: markers)
    pointsOfInterestSearchController = AppleMapsPOISearchController(searchService: pointsOfInterestSearchService)
  }
  
  func fetchSearchCompletions(searchQueryFragment: String, promise: Promise) {
    pointsOfInterestSearchCompleter.setSearchCompleterRegion(region: mapView.region)
    pointsOfInterestSearchCompleter.autoComplete(searchQueryFragment: searchQueryFragment, promise: promise)
  }
  
  func createSearchRequest(searchQuery: String) {
    pointsOfInterestSearchService.createSearchRequest(for: searchQuery)
  }
  
  func setEnabledPOISearching(enabled: Bool) {
    if (enabled) {
      pointsOfInterestSearchController.enablePOISearchController(mapView: mapView)
    } else {
      pointsOfInterestSearchController.disablePOISearchController()
    }
  }
  
  
  //dispaying poi on map
  @available(iOS 14.0, *)
  func setEnabledShowPOI(enabled: Bool) {
    if (enabled) {
      pointsOfInterestSearchService.createSearchRequest()
    } else {
      markers.setMarkers(markerObjects: [])
    }
  }

}

//adding filter with specified categories
@available(iOS 13.0, *)
extension AppleMapsPOI {
  
  func setEnabledPOIFilter(categories: [POICategoryType]) {
    let categories = categories.compactMap(mapToMKPOICategories)
    pointsOfInterestSearchService.setPointsOfInterestCategories(categories: categories)
    let filter = categories.isEmpty ? nil : MKPointOfInterestFilter.init(including: categories)
    pointsOfInterestSearchCompleter.setSearchCompleterFilters(filter: filter)
  }

  private func mapToMKPOICategories(category: POICategoryType) -> MKPointOfInterestCategory {
    var mappedCategory: MKPointOfInterestCategory
    switch category {
    case .airport:
      mappedCategory = .airport
    case .atm:
      mappedCategory = .atm
    case .bank:
      mappedCategory = .bank
    case .beach:
      mappedCategory = .beach
    case .cafe:
      mappedCategory = .cafe
    case .hospital:
      mappedCategory = .hospital
    case .hotel:
      mappedCategory = .hotel
    case .museum:
      mappedCategory = .museum
    case .pharmacy:
      mappedCategory = .pharmacy
    case .store:
      mappedCategory = .store
    case .zoo:
      mappedCategory = .zoo
    }
    return mappedCategory
  }
  
}
