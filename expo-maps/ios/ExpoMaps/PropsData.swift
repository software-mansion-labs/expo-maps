import ExpoModulesCore

enum MapType: String, EnumArgument {
  case normal
  case hybrid
  case satellite
  case terrain
}

struct MarkerObject: Record {
  @Field var latitude: Double = 0
  @Field var longitude: Double = 0
  @Field var title: String? = nil
  @Field var snippet: String? = nil
  @Field var icon: String? = nil
  @Field var defaultMarkerColor: Double = 0
  @Field var draggable: Bool = false
  @Field var anchorU: Double? = nil
  @Field var anchorV: Double? = nil
  @Field var opacity: Double = 1
}

struct Point: Record {
  @Field
  var latitude: CGFloat = 0

  @Field
  var longitude: CGFloat = 0
}

struct PolygonObject: Record {
  @Field
  var points: [Point] = []
}

struct PolylineObject: Record {
  @Field
  var points: [Point] = []
}
