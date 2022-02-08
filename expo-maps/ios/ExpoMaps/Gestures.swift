protocol Gestures {    
    init?(coder: NSCoder)
    
    func setEnabledRotateGesture(enabled: Bool)
    func setEnabledScrollGesture(enabled: Bool)
    func setEnabledTiltGesture(enabled: Bool)
    func setEnabledZoomGesture(enabled: Bool)
    func setEnabledAllGestures(enabled: Bool)
}
