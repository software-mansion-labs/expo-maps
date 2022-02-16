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
  @Field var latitude: CGFloat = 0
  @Field var longitude: CGFloat = 0
}

struct PolygonObject: Record {
  @Field var points: [Point] = []
  @Field var fillColor: Int?
  @Field var strokeColor: Int?
  @Field var strokeWidth: Float?
  @Field var strokePattern: [PatternItem]
  @Field var jointType: Joint?
}

struct PolylineObject: Record {
  @Field var points: [Point] = []
  @Field var color: Int?
  @Field var width: Float?
  @Field var pattern: [PatternItem]
  @Field var jointType: Joint?
  @Field var capType: Cap?
}

enum PatternItem {
  case Dot
  case Dash(Double)
  case Gap(Double)
}

enum Joint : Int {
  case Miter = 0
  case Round
  case Bevel
}

enum Cap : Int {
  case Butt = 0
  case Round = 1
  case Square = 2
}
