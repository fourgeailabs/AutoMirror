package com.fourgeailabs.automirror

import android.content.pm.ApplicationInfo
import androidx.car.app.CarAppService
import androidx.car.app.Session
import androidx.car.app.validation.HostValidator

class AutoMirrorAppService : CarAppService() {

    override fun createHostValidator(): HostValidator {
        // Allows connection from any Android Auto head unit, emulator (DHU), AAWireless, or vehicle
        return HostValidator.ALLOW_ALL_HOSTS_VALIDATOR
    }

    override fun onCreateSession(): Session {
        return AutoMirrorSession()
    }
}
