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
