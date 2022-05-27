import MapKit

class AppleMapsPOISearch {
  
  private var mapView: MKMapView
  private var markers: AppleMapsMarkers
  
  private var pointOfInterestCategories: [MKPointOfInterestCategory]?
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
  
  func setPointsOfInterestCategories(categories: [MKPointOfInterestCategory]) {
    pointOfInterestCategories = categories
  }
  
  private func search() {
    localSearch?.start { [unowned self] (response, error) in
      guard error == nil else {
          print("MKLocalSearch search start resulted in an error")
          return
      }
      searchResultRegion = response?.boundingRegion
      places = response?.mapItems
    }
  }
}

//MKLocalPointsOfInterestRequest
@available(iOS 14.0, *)
extension AppleMapsPOISearch {
  
  func createSearchRequest() {
    let searchRequest = MKLocalPointsOfInterestRequest(coordinateRegion: mapView.region)
    setSearchRequestFilter(request: searchRequest)
    search(using: searchRequest)
  }
  
  private func setSearchRequestFilter(request: MKLocalPointsOfInterestRequest) {
    guard let categories = pointOfInterestCategories else {
      return
    }
    let filter = categories.isEmpty ? nil : MKPointOfInterestFilter.init(including: categories)
    request.pointOfInterestFilter = filter
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
    setSearchFilter(request: searchRequest)
    seatSearchRegion(request: searchRequest)
    search(using: searchRequest)
  }
  
  func createSearchRequest(for queryString: String?) {
    let searchRequest = MKLocalSearch.Request()
    searchRequest.naturalLanguageQuery = queryString
    setSearchFilter(request: searchRequest)
    seatSearchRegion(request: searchRequest)
    search(using: searchRequest)
  }
  
  private func setSearchFilter(request: MKLocalSearch.Request) {
    guard #available(iOS 13.0, *), let categories = pointOfInterestCategories else {
      return
    }
    let filter = categories.isEmpty ? nil : MKPointOfInterestFilter.init(including: categories)
    request.pointOfInterestFilter = filter

  }
  
  private func seatSearchRegion(request: MKLocalSearch.Request) {
    request.region = mapView.region
  }
  
  private func search(using searchRequest: MKLocalSearch.Request) {
    localSearch = MKLocalSearch(request: searchRequest)
    search()
  }
  
}

//displaying search results
extension AppleMapsPOISearch {
  
  private func displayMarkerks() {
    let pointsOfInterestToDisplay = getMarkersToDisplay()
    setMarkersDisplayRegion()
    setMapViewFilter()
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
      marker.color = UIColor.clear
      marker.draggable = false
      return marker
    }
    return annotations
  }
  
  private func setMarkersDisplayRegion() {
    guard let region = searchResultRegion else {
      return
    }
    mapView.region = region
  }
  
  private func setMapViewFilter() {
    guard #available(iOS 13.0, *), let categories = pointOfInterestCategories else {
      return
    }
    let filter = categories.isEmpty ? nil : MKPointOfInterestFilter.init(including: categories)
    mapView.pointOfInterestFilter = filter
  }
  
}
