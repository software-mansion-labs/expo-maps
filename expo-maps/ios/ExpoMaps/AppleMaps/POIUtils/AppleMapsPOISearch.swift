import MapKit

class AppleMapsPOISearch {
  
  private var mapView: MKMapView
  private var markers: AppleMapsMarkers
  
  private var poiFilterCategories: [MKPointOfInterestCategory] = []
  private var searchResultRegion: MKCoordinateRegion?
  private var places: [MKMapItem]? {
    didSet {
      displayMarkerks()
    }
  }
  private var localSearch: MKLocalSearch? {
    willSet {
      places = nil
      localSearch?.cancel()
    }
  }
  
  init(mapView: MKMapView, markers: AppleMapsMarkers) {
    self.mapView = mapView
    self.markers = markers
  }
  
  private func search() {
    localSearch?.start { [unowned self] (response, error) in
      guard error == nil else {
        //handle error
          return
      }
      places = response?.mapItems
      searchResultRegion = response?.boundingRegion
    }
  }
  
  private func displayMarkerks() {
    let pointsOfInterestToDisplay = getMarkersToDisplay()
    if let region = searchResultRegion {
      mapView.region = region
    }
    markers.setMarkers(markerObjects: pointsOfInterestToDisplay)
  }
  
  private func getMarkersToDisplay() -> [MarkerObject] {
    guard let places = places else { return [] }
    let annotations = places.compactMap { item -> MarkerObject? in
      let marker = MarkerObject()
      marker.latitude = item.placemark.coordinate.latitude
      marker.longitude = item.placemark.coordinate.longitude
      marker.markerTitle = item.name
      marker.opacity = 1
      marker.color = 1
      marker.draggable = false
      return marker
    }
    return annotations
  }
  
}

//MKLocalPointsOfInterestRequest
@available(iOS 14.0, *)
extension AppleMapsPOISearch {
  
  func createSearchRequest() {
    let searchRequest = MKLocalPointsOfInterestRequest(coordinateRegion: mapView.region)
    setSearchRequestDetails(searchRequest: searchRequest)
    search(using: searchRequest)
  }
  
  private func setSearchRequestDetails(searchRequest: MKLocalPointsOfInterestRequest) {
    if poiFilterCategories.isEmpty {
      return
    }
    searchRequest.pointOfInterestFilter = MKPointOfInterestFilter(including: poiFilterCategories)
  }
  
  private func search(using searchRequest: MKLocalPointsOfInterestRequest) {
    localSearch = MKLocalSearch(request: searchRequest)
    search()
  }
  
}

//MKLocalSearch.Request
extension AppleMapsPOISearch {
  
  func createSearchRequest(for suggestedCompletion: MKLocalSearchCompletion) {
    let searchRequest = MKLocalSearch.Request(completion: suggestedCompletion)
    setSearchRequestDetails(searchRequest: searchRequest)
    search(using: searchRequest)
  }
  
  func createSearchRequest(for queryString: String?) {
    let searchRequest = MKLocalSearch.Request()
    searchRequest.naturalLanguageQuery = queryString
    setSearchRequestDetails(searchRequest: searchRequest)
    search(using: searchRequest)
  }
  
  private func setSearchRequestDetails(searchRequest: MKLocalSearch.Request) {
    searchRequest.region = mapView.region
    if #available(iOS 13.0, *) {
      searchRequest.resultTypes = .pointOfInterest
    }
  }
  
  private func search(using searchRequest: MKLocalSearch.Request) {
    localSearch = MKLocalSearch(request: searchRequest)
    search()
  }
  
}

//set filter on mapView
extension AppleMapsPOISearch {
  
  func setPOIFilterCategories(categories: [MKPointOfInterestCategory]) {
    poiFilterCategories = categories
    if #available(iOS 13.0, *) {
      if !poiFilterCategories.isEmpty {
          mapView.pointOfInterestFilter = MKPointOfInterestFilter(including: poiFilterCategories)
      } else {
        mapView.pointOfInterestFilter = MKPointOfInterestFilter.includingAll
      }
    }
  }
  
}
