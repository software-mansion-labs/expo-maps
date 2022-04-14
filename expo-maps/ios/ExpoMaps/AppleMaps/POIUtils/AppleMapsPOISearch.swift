import MapKit

class AppleMapsPOISearch {
  
  private var mapView: MKMapView
  private var markers: AppleMapsMarkers
  private var places: [MKMapItem]? {
    didSet {
      prepareMarkers()
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
  
  
  func search(using searchRequest: MKLocalSearch.Request) {
    searchRequest.region = mapView.region
    if #available(iOS 13.0, *) {
      searchRequest.resultTypes = .pointOfInterest
    }
    localSearch = MKLocalSearch(request: searchRequest)
    search()
  }
  
  @available(iOS 14.0, *)
  func search(using searchRequest: MKLocalPointsOfInterestRequest) {
    let request = MKLocalPointsOfInterestRequest(coordinateRegion: mapView.region)
//    request.pointOfInterestFilter = MKPointOfInterestFilter(excluding: [MKPointOfInterestCategory.airport])
    localSearch = MKLocalSearch(request: request)
    search()
  }
  
  private func search() {
    localSearch?.start { [unowned self] (response, error) in
      guard error == nil else {
          return
      }
      places = response?.mapItems
      
      if let region = response?.boundingRegion {
        mapView.region = region
      }
    }
  }
  
  private func prepareMarkers() {
    guard let places = places else { return }
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
    markers.setMarkers(markerObjects: annotations)
    if #available(iOS 13.0, *) {
      mapView.pointOfInterestFilter = MKPointOfInterestFilter(excluding: [MKPointOfInterestCategory.airport])
    }
  }
}
