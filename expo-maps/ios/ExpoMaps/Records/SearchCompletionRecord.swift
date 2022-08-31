import ExpoModulesCore
import GoogleMaps
import MapKit
import GoogleMapsUtils

struct SearchCompletionRecord: Record {
  init() {}

  @Field var title: String?
  @Field var subtitle: String?
  @Field var titleHighlightRanges: [Any?]
  @Field var subtitleHighlightRanges: [Any?]

  init(completion: MKLocalSearchCompletion) {
    title = completion.title
    subtitle = completion.subtitle
    titleHighlightRanges = completion.titleHighlightRanges.map { value in
      if let range = value as? NSRange {
        print([range.lowerBound, range.upperBound])
        return [range.lowerBound, range.upperBound]
      }
      return nil
    }
    subtitleHighlightRanges = completion.subtitleHighlightRanges.map { value in
      if let range = value as? NSRange {
        print([range.lowerBound, range.upperBound].description)
        return [range.lowerBound, range.upperBound].description
      }
      return nil
    }
  }
}
