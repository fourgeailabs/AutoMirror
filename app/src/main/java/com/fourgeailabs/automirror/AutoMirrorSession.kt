package com.fourgeailabs.automirror

import android.content.Intent
import androidx.car.app.Screen
import androidx.car.app.Session

class AutoMirrorSession : Session() {
    override fun onCreateScreen(intent: Intent): Screen {
        return AutoMirrorScreen(carContext)
    }
}
