import MapKit

class AppleMapsPOISearchController: NSObject {
  
  private let mapView: MKMapView
  private let poisearch: AppleMapsPOISearch
  private var navigationBar: UINavigationBar
  private var navigationItem: UINavigationItem
  private var searchController: UISearchController?
  private var searchResultsTable: AppleMapsPOITableView?
  
  init(mapView: MKMapView, search: AppleMapsPOISearch) {
    self.mapView = mapView
    poisearch = search
    
    navigationBar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: 100))
    navigationItem = UINavigationItem()
    navigationItem.hidesSearchBarWhenScrolling = false
    navigationBar.setItems([navigationItem], animated: false)
  }
  
  func enableSearchingForPOI() {
    mapView.addSubview(navigationBar)
    setSearchController()
  }
  
  private func setSearchController() {
    searchResultsTable = AppleMapsPOITableView(style: .grouped)
    searchResultsTable?.tableView.delegate = self
    searchResultsTable?.mapView = mapView
    searchResultsTable?.definesPresentationContext = false
    searchController = UISearchController(searchResultsController: searchResultsTable)
    searchController?.searchResultsUpdater = searchResultsTable
    searchController?.hidesNavigationBarDuringPresentation = false
    setSearchBar()
    navigationItem.searchController = searchController
  }
  
  private func setSearchBar() {
    let searchBar = searchController?.searchBar
    searchBar?.sizeToFit()
    searchBar?.placeholder = "Search for points of interst..."
    searchBar?.delegate = self
  }
  
  private func search(for suggestedCompletion: MKLocalSearchCompletion) {
    let searchRequest = MKLocalSearch.Request(completion: suggestedCompletion)
    search(using: searchRequest)
  }
  
  private func search(for queryString: String?) {
    let searchRequest = MKLocalSearch.Request()
    searchRequest.naturalLanguageQuery = queryString
    search(using: searchRequest)
  }
  
  private func search(using searchRequest: MKLocalSearch.Request) {
    poisearch.search(using: searchRequest)
  }
  
  private func displaySearchError() {
//    let alertController = UIAlertController(title: "Could not find any places.", message: "No places were found for this search!", preferredStyle: .alert)
//    alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
//    present(alertController, animated: true, completion: nil)
  }
}

//table view delegate
extension AppleMapsPOISearchController: UITableViewDelegate {
  func tableView(_ tableView: UITableView, didDeselectRowAt indexPath: IndexPath) {
    tableView.deselectRow(at: indexPath, animated: true)
    if let suggestion =
      searchResultsTable?.searchCompleterResults?[indexPath.row] {
      searchController?.isActive = false
      searchController?.searchBar.text = suggestion.title
      search(for: suggestion)
    }
  }
}

extension AppleMapsPOISearchController: UISearchBarDelegate {
  func searchBarTextDidBeginEditing(_ searchBar: UISearchBar) {
    searchBar.setShowsCancelButton(true, animated: true)
  }
  
  func searchBarTextDidEndEditing(_ searchBar: UISearchBar) {
    searchBar.setShowsCancelButton(false, animated: true)
  }
  
  func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
    if let text = searchBar.text {
      searchController?.isActive = false
      searchController?.searchBar.text = text
      search(for: text)
    }
  }
}
