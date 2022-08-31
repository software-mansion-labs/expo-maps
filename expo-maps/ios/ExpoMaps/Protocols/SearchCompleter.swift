protocol SearchCompleter {
  associatedtype T
  func autoComplete(searchQueryFragment: String)
  func getSearchCompletions() -> [[String: Any?]]
  func mapSearchCompletions(completions: [T]) -> [[String: Any?]]
}
