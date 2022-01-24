import ExpoModulesCore

enum MapType: String, EnumArgument {
  case normal
  case hybrid
  case satellite
  case terrain
}

struct MarkerObject: Record {
  @Field
  var type: String?

  @Field
  var lat: CGFloat?

  @Field
  var lng: CGFloat?
}
