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
  @Field var fillColor: UIColor?
  @Field var strokeColor: UIColor?
  @Field var strokeWidth: Float?
  @Field var strokePattern: [PatternItem]? = nil
  @Field var jointType: Joint?
}

struct PolylineObject: Record {
  @Field var points: [Point] = []
  @Field var color: UIColor?
  @Field var width: Float?
  @Field var pattern: [PatternItem]? = nil
  @Field var jointType: Joint?
  @Field var capType: Cap?
}

struct PatternItem: Record {
  @Field var type: PatternType = .stroke
  @Field var length: Float = 1.0
}

enum PatternType: String, EnumArgument {
  case stroke
  case gap
}

enum Joint: String, EnumArgument {
  case miter
  case round
  case bevel
}

enum Cap: String, EnumArgument {
  case butt
  case round
  case square
}

struct CircleObject: Record {
  @Field var center: Point = Point()
  @Field var radius: Double = 0
  @Field var strokeColor: UIColor? = nil
  @Field var fillColor: UIColor? = nil
  @Field var strokeWidth: Float? = nil
}
