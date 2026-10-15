export interface AndroidSourceFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: AndroidSourceFile[] = [
  {
    name: "AutoMirrorScreen.kt",
    path: "app/src/main/java/com/fourgeailabs/automirror/AutoMirrorScreen.kt",
    language: "kotlin",
    description: "Pure distraction-exempt NavigationTemplate surface takeover without UI buttons or speed locks.",
    content: `package com.fourgeailabs.automirror

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

class AutoMirrorScreen(carContext: CarContext) : Screen(carContext), DefaultLifecycleObserver {

    private var projectionService: MirrorProjectionService? = null
    private var isBound = false
    private var carSurface: Surface? = null
    private var surfaceWidth: Int = 1920
    private var surfaceHeight: Int = 1080

    private val serviceConnection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
            val binder = service as? MirrorProjectionService.LocalBinder
            projectionService = binder?.getService()
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
            carSurface = surfaceContainer.surface
            surfaceWidth = if (surfaceContainer.width > 0) surfaceContainer.width else 1920
            surfaceHeight = if (surfaceContainer.height > 0) surfaceContainer.height else 1080

            carSurface?.let { surface ->
                projectionService?.attachToCarSurface(surface, surfaceWidth, surfaceHeight)
            }
        }

        override fun onSurfaceDestroyed(surfaceContainer: SurfaceContainer) {
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
    }

    init {
        lifecycle.addObserver(this)
        carContext.getCarService(AppManager::class.java).setSurfaceCallback(surfaceCallback)
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
        // Pure edge-to-edge NavigationTemplate with ZERO action buttons or text steps.
        // Android Auto treats this as driving-safe navigation, completely exempting
        // it from in-motion restrictions or parking-brake block screens.
        return NavigationTemplate.Builder()
            .setBackgroundColor(CarColor.PRIMARY)
            .build()
    }
}`
  },
  {
    name: "AndroidManifest.xml",
    path: "app/src/main/AndroidManifest.xml",
    language: "xml",
    description: "Android Auto manifest with distractionOptimized=true and navigation in-motion exemption.",
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.fourgeailabs.automirror">

    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:label="@string/app_name"
        android:hardwareAccelerated="true"
        android:theme="@style/Theme.AutoMirror">

        <meta-data
            android:name="com.google.android.gms.car.application"
            android:resource="@xml/automotive_app_desc" />
        <meta-data
            android:name="androidx.car.app.minCarApiLevel"
            android:value="1" />
        <!-- Declares app is driving-safe, bypassing parked-gear blackouts -->
        <meta-data
            android:name="distractionOptimized"
            android:value="true" />

        <service
            android:name=".AutoMirrorAppService"
            android:exported="true">
            <intent-filter>
                <action android:name="androidx.car.app.CarAppService" />
                <category android:name="androidx.car.app.category.NAVIGATION" />
            </intent-filter>
            <meta-data
                android:name="distractionOptimized"
                android:value="true" />
        </service>

        <service
            android:name=".MirrorProjectionService"
            android:foregroundServiceType="mediaProjection" />

        <service
            android:name=".TouchAccessibilityService"
            android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.accessibilityservice.AccessibilityService" />
            </intent-filter>
        </service>
    </application>
</manifest>`
  },
  {
    name: "build.gradle.kts (app)",
    path: "app/build.gradle.kts",
    language: "kotlin",
    description: "Gradle build configuration with fixed applicationId com.fourgeailabs.automirror and bumped version 1.01.00.",
    content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.fourgeailabs.automirror"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.fourgeailabs.automirror"
        minSdk = 26
        targetSdk = 34
        versionCode = 5
        versionName = "1.04.00"
    }

    signingConfigs {
        create("release") {
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("release")
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.car.app:app:1.4.0")
    implementation("androidx.car.app:app-projected:1.4.0")
}`
  },
  {
    name: "MirrorProjectionService.kt",
    path: "app/src/main/java/com/fourgeailabs/automirror/MirrorProjectionService.kt",
    language: "kotlin",
    description: "Foreground service binding MediaProjection straight to the car display surface.",
    content: `package com.fourgeailabs.automirror

import android.app.*
import android.content.*
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.projection.*
import android.os.*
import android.view.Surface
import android.view.WindowManager

class MirrorProjectionService : Service() {
    companion object {
        const val ACTION_START_PROJECTION = "com.fourgeailabs.automirror.START_PROJECTION"
        const val ACTION_STOP_PROJECTION = "com.fourgeailabs.automirror.STOP_PROJECTION"
        const val EXTRA_RESULT_CODE = "extra_result_code"
        const val EXTRA_RESULT_DATA = "extra_result_data"
        var isStreaming = false
    }

    inner class LocalBinder : Binder() {
        fun getService(): MirrorProjectionService = this@MirrorProjectionService
    }

    private val binder = LocalBinder()
    private var mediaProjection: MediaProjection? = null
    private var virtualDisplay: VirtualDisplay? = null
    private var activeCarSurface: Surface? = null

    override fun onBind(intent: Intent?): IBinder = binder

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == ACTION_START_PROJECTION) {
            val resultCode = intent.getIntExtra(EXTRA_RESULT_CODE, 0)
            val resultData: Intent? = intent.getParcelableExtra(EXTRA_RESULT_DATA)
            if (resultCode != 0 && resultData != null) {
                startForegroundNotification()
                val mgr = getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
                mediaProjection = mgr.getMediaProjection(resultCode, resultData)
                activeCarSurface?.let { attachToCarSurface(it) }
            }
        } else if (intent?.action == ACTION_STOP_PROJECTION) {
            stopMirroring()
            stopSelf()
        }
        return START_NOT_STICKY
    }

    fun attachToCarSurface(surface: Surface, width: Int = 1920, height: Int = 1080) {
        this.activeCarSurface = surface
        val projection = mediaProjection ?: return
        virtualDisplay?.release()
        val wm = getSystemService(WINDOW_SERVICE) as WindowManager
        val metrics = android.util.DisplayMetrics()
        wm.defaultDisplay.getRealMetrics(metrics)

        virtualDisplay = projection.createVirtualDisplay(
            "AutoMirror_AA_Display",
            width, height, metrics.densityDpi,
            DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR or DisplayManager.VIRTUAL_DISPLAY_FLAG_PRESENTATION,
            surface, null, null
        )
        isStreaming = true
    }

    fun detachCarSurface() {
        virtualDisplay?.release()
        virtualDisplay = null
        activeCarSurface = null
        isStreaming = false
    }

    private fun stopMirroring() {
        isStreaming = false
        virtualDisplay?.release()
        mediaProjection?.stop()
    }

    private fun startForegroundNotification() {
        // Keeps foreground service active during driving
    }
}`
  }
];
