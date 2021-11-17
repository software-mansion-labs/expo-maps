import UIKit

class SolidColorView : UIView {
  init() {
    super.init(frame: CGRect.zero)
    backgroundColor = UIColor(red: 1, green: 1, blue: 1, alpha: 1)
  }
    
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func setColor(_ color: CGColor) {
    backgroundColor = UIColor(cgColor: color);
  }
}
