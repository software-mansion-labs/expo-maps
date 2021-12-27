package expo.modules.maps

import android.content.Context
import android.graphics.Color
import android.view.View

class SolidColorView(context: Context): View(context) {
  init {
    setBackgroundColor(Color.GREEN)
  }

  fun setColor(color: Int) {
    setBackgroundColor(color)
  }
}
