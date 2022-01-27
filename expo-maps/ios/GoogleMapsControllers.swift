import GoogleMaps

 class GoogleMapsControllers {
   private let mapView: GMSMapView

   init(mapView: GMSMapView) {
     self.mapView = mapView
   }

   func setShowCompass(enable: Bool) {
     self.mapView.settings.compassButton = enable
   }
     
   func setShowMyLocationButton(enable: Bool) {
     if (enable == true) {
        self.mapView.isMyLocationEnabled = true
     }
     self.mapView.settings.myLocationButton = enable
   }

    func setShowLevelPicker(enable: Bool) {
      //appears whenever an indoor map is featured prominently
      self.mapView.settings.indoorPicker = enable
    }
 }
