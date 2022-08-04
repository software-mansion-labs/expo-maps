import ExpoModulesCore
import GoogleMaps

struct CameraPositionRecord : Record{
    init() {}

    @Field
    var target: [String:Any?]?

    @Field
    var zoom: Float?

    @Field
    var bearing: Double?

    @Field
    var tilt: Double?

    init(cameraPosition:GMSCameraPosition){
        target = LatLngRecord(coordinate: cameraPosition.target).toDictionary();
        zoom = cameraPosition.zoom
        bearing = cameraPosition.bearing;
        tilt = cameraPosition.viewingAngle;
    }
}
