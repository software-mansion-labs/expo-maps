import ExpoModulesCore

enum MapType: String, EnumArgument {
  case normal
  case hybrid
  case satellite
  case terrain
}

struct MarkerObject: Record {
  @Field
  var latitude: CGFloat = 0

  @Field
  var longitude: CGFloat = 0
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
