import MapKit

class AppleMapsPOISearchCompleter: NSObject {
  
  private var searchCompleter = MKLocalSearchCompleter()
  private var searchCompleterResults: [MKLocalSearchCompletion]?
  
  
  init(delegate: MKLocalSearchCompleterDelegate?) {
    super.init()
    let delegate = delegate ?? self
    searchCompleter.delegate = delegate
  }
  
  func autoComplete(_ searchQueryFragment: String) {
    searchCompleter.queryFragment = searchQueryFragment
  }
  
  func getSearchCompletions() -> [MKLocalSearchCompletion] {
    return searchCompleterResults ?? []
  }
  
  func setSearchCompleterRegion(mapView: MKMapView?) {
    guard let region = mapView?.region else {
      return
    }
    searchCompleter.region = region
  }
  
  @available(iOS 13.0, *)
  func setSearchCompleterFilters(filter: MKPointOfInterestFilter?) {
    if let filter = filter {
      searchCompleter.pointOfInterestFilter = filter
    }
    searchCompleter.resultTypes = .pointOfInterest
  }

}

extension AppleMapsPOISearchCompleter: MKLocalSearchCompleterDelegate {
  
  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    searchCompleterResults = completer.results
  }
  
}
