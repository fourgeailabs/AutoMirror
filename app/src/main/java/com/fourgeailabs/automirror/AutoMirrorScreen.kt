package com.fourgeailabs.automirror

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.graphics.Rect
import android.os.IBinder
import android.util.Log
import android.view.Surface
import androidx.car.app.AppManager
import androidx.car.app.CarContext
import androidx.car.app.Screen
import androidx.car.app.SurfaceCallback
import androidx.car.app.SurfaceContainer
import androidx.car.app.model.CarColor
import androidx.car.app.model.Template
import androidx.car.app.navigation.model.NavigationTemplate
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner

/**
 * AutoMirrorScreen: Pure, unobstructed full-screen surface takeover for Android Auto.
 * 
 * Configured as a distraction-exempt Navigation surface:
 * - Employs zero interactive UI buttons or steps to ensure 100% in-motion bypass.
 * - Android Auto treats this raw hardware Surface as an active navigation route,
 *   preventing driving restriction screens from disabling or blanking the display.
 */
class AutoMirrorScreen(carContext: CarContext) : Screen(carContext), DefaultLifecycleObserver {

    companion object {
        private const val TAG = "AutoMirrorScreen"
    }

    private var projectionService: MirrorProjectionService? = null
    private var isBound = false
    private var carSurface: Surface? = null
    private var surfaceWidth: Int = 2880
    private var surfaceHeight: Int = 1080

    private val serviceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            val binder = service as? MirrorProjectionService.LocalBinder
            projectionService = binder?.getService()
            Log.i(TAG, "MirrorProjectionService linked to Android Auto display surface")
            carSurface?.let { surface ->
                projectionService?.attachToCarSurface(surface, surfaceWidth, surfaceHeight)
            }
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            projectionService = null
        }
    }

    private val surfaceCallback = object : SurfaceCallback {
        override fun onSurfaceAvailable(surfaceContainer: SurfaceContainer) {
            Log.i(TAG, "Android Auto Surface Available: ${surfaceContainer.width}x${surfaceContainer.height}")
            carSurface = surfaceContainer.surface
            surfaceWidth = if (surfaceContainer.width > 0) surfaceContainer.width else 1920
            surfaceHeight = if (surfaceContainer.height > 0) surfaceContainer.height else 1080

            carSurface?.let { surface ->
                projectionService?.attachToCarSurface(surface, surfaceWidth, surfaceHeight)
            }
        }

        override fun onVisibleAreaChanged(visibleArea: Rect) {
            Log.d(TAG, "Android Auto Visible Area: $visibleArea")
        }

        override fun onStableAreaChanged(stableArea: Rect) {
            Log.d(TAG, "Android Auto Stable Area: $stableArea")
        }

        override fun onSurfaceDestroyed(surfaceContainer: SurfaceContainer) {
            Log.i(TAG, "Android Auto Surface Destroyed")
            projectionService?.detachCarSurface()
            carSurface = null
        }

        override fun onClick(x: Float, y: Float) {
            // Forward touch click event to phone via AccessibilityService
            if (surfaceWidth > 0 && surfaceHeight > 0) {
                val displayMetrics = carContext.resources.displayMetrics
                val phoneX = (x / surfaceWidth) * displayMetrics.widthPixels
                val phoneY = (y / surfaceHeight) * displayMetrics.heightPixels
                TouchAccessibilityService.performTap(phoneX, phoneY)
            }
        }

        override fun onScroll(distanceX: Float, distanceY: Float) {
            // Forward scroll gesture
        }

        override fun onFling(velocityX: Float, velocityY: Float) {
            // Forward fling gesture
        }
    }

    init {
        lifecycle.addObserver(this)
        try {
            carContext.getCarService(AppManager::class.java).setSurfaceCallback(surfaceCallback)
        } catch (e: Exception) {
            Log.e(TAG, "Error setting car surface callback", e)
        }
    }

    override fun onCreate(owner: LifecycleOwner) {
        val intent = Intent(carContext, MirrorProjectionService::class.java)
        carContext.bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE)
        isBound = true
    }

    override fun onDestroy(owner: LifecycleOwner) {
        if (isBound) {
            carContext.unbindService(serviceConnection)
            isBound = false
        }
    }

    override fun onGetTemplate(): Template {
        // Pure edge-to-edge NavigationTemplate with ZERO action strip or UI buttons.
        // This ensures Android Auto never triggers 6-step touch limits or speed restriction banners.
        return NavigationTemplate.Builder()
            .setBackgroundColor(CarColor.PRIMARY)
            .build()
    }
}
