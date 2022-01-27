import MapKit

 class AppleMapsControllers {
   private let mapView: MKMapView

   init(mapView: MKMapView) {
     self.mapView = mapView
   }

   func setShowCompass(enable: Bool) {
     self.mapView.showsCompass = enable
   }
     
   func setShowMyLocationButton(enable: Bool) {
     if (enable == true) {
        self.enableMyLocationButton()
     }
   }

    func setShowFloorPicker(enable: Bool) {
      //TODO: enable floor picker
    }
    
    private func enableMyLocationButton() {
      self.mapView.showsUserLocation = true
      let myLocationButton = MKUserTrackingButton(mapView: self.mapView)
      myLocationButton.layer.backgroundColor = UIColor(white: 1, alpha: 0.5).cgColor
      myLocationButton.layer.borderColor = UIColor.white.cgColor
      myLocationButton.layer.borderWidth = 1
      myLocationButton.layer.cornerRadius = 5
      myLocationButton.translatesAutoresizingMaskIntoConstraints = false
      self.mapView.addSubview(myLocationButton)
             
      NSLayoutConstraint.activate([
          myLocationButton.topAnchor.constraint(equalTo: self.mapView.topAnchor,
constant: 100),
          myLocationButton.trailingAnchor.constraint(equalTo:
self.mapView.trailingAnchor, constant: -10)
      ])
    }
 }
