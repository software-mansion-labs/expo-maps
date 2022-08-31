import MapKit
import ExpoModulesCore

class AppleMapsPOISearchCompleter: NSObject, SearchCompleter {

  private var searchCompleter = MKLocalSearchCompleter()
  private var searchCompleterResults: [MKLocalSearchCompletion]?
  private var searchCompletionsPromise: Promise?

  init(delegate: MKLocalSearchCompleterDelegate?) {
    super.init()
    let delegate = delegate ?? self
    searchCompleter.delegate = delegate
  }

  func autoComplete(searchQueryFragment: String) {
    searchCompleter.queryFragment = searchQueryFragment
  }

  func autoComplete(searchQueryFragment: String, promise: Promise) {
    searchCompletionsPromise = promise
    searchCompleter.queryFragment = searchQueryFragment
  }

  func getSearchCompletions() -> [[String: Any?]] {
    if let results = searchCompleterResults {
      return mapSearchCompletions(completions: results)
    }
    return []
  }

  func setSearchCompleterRegion(region: MKCoordinateRegion) {
    searchCompleter.region = region
  }

  @available(iOS 13.0, *)
  func setSearchCompleterFilters(filter: MKPointOfInterestFilter?) {
    searchCompleter.resultTypes = .pointOfInterest
    guard let filter = filter else {
      searchCompleter.pointOfInterestFilter = nil
      return
    }
    searchCompleter.pointOfInterestFilter = filter
  }

  private func resolveSearchCompletionsPromise() {
    guard searchCompletionsPromise != nil else {
      return
    }

    if let results = searchCompleterResults {
      let searchCompletions = mapSearchCompletions(completions: results)
      searchCompletionsPromise?.resolve(searchCompletions)
    } else {
      let errorMessage = "Error while fetching search completions."
      searchCompletionsPromise?.reject("", errorMessage)
    }
    searchCompletionsPromise = nil
  }

  func mapSearchCompletions(completions: [MKLocalSearchCompletion]) -> [[String: Any?]] {
    var completionRecords: [[String: Any?]] = []
    for completion in completions {
      completionRecords.append(SearchCompletionRecord(completion: completion).toDictionary())
    }
    return completionRecords
  }

}

extension AppleMapsPOISearchCompleter: MKLocalSearchCompleterDelegate {

  func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
    searchCompleterResults = completer.results
//    print(completer.results[0])
//    let searchRequest = MKLocalSearch.Request()
//    let query = "McDonalds"
//    searchRequest.naturalLanguageQuery = query
//    let searechco = MKLocalSearch(request: searchRequest)
//    searechco.start { (response, error) in
//      guard let response = response else {
//        return
//      }
//      for item in response.mapItems {
//        print(item)
//      }
//    }
    resolveSearchCompletionsPromise()
  }
}
