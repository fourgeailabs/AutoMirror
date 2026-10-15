package com.fourgeailabs.automirror

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.ServiceInfo
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.os.Binder
import android.os.Build
import android.os.IBinder
import android.os.PowerManager
import android.util.DisplayMetrics
import android.util.Log
import android.view.Surface
import android.view.WindowManager
import androidx.core.app.NotificationCompat

class MirrorProjectionService : Service() {

    companion object {
        private const val TAG = "AutoMirrorService"
        private const val NOTIFICATION_ID = 4040
        private const val CHANNEL_ID = "automirror_streaming_channel"

        const val ACTION_START_PROJECTION = "com.fourgeailabs.automirror.START_PROJECTION"
        const val ACTION_STOP_PROJECTION = "com.fourgeailabs.automirror.STOP_PROJECTION"
        const val EXTRA_RESULT_CODE = "extra_result_code"
        const val EXTRA_RESULT_DATA = "extra_result_data"

        var isStreaming: Boolean = false
            private set
    }

    inner class LocalBinder : Binder() {
        fun getService(): MirrorProjectionService = this@MirrorProjectionService
    }

    private val binder = LocalBinder()
    private var mediaProjection: MediaProjection? = null
    private var virtualDisplay: VirtualDisplay? = null
    private var wakeLock: PowerManager.WakeLock? = null
    private var activeCarSurface: Surface? = null

    override fun onBind(intent: Intent?): IBinder = binder

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        acquireWakeLock()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_START_PROJECTION -> {
                val resultCode = intent.getIntExtra(EXTRA_RESULT_CODE, 0)
                val resultData: Intent? = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    intent.getParcelableExtra(EXTRA_RESULT_DATA, Intent::class.java)
                } else {
                    @Suppress("DEPRECATION")
                    intent.getParcelableExtra(EXTRA_RESULT_DATA)
                }

                if (resultCode != 0 && resultData != null) {
                    startForegroundNotification()
                    val projectionManager = getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
                    mediaProjection = projectionManager.getMediaProjection(resultCode, resultData)
                    mediaProjection?.registerCallback(object : MediaProjection.Callback() {
                        override fun onStop() {
                            super.onStop()
                            stopMirroring()
                        }
                    }, null)

                    activeCarSurface?.let { surface ->
                        attachToCarSurface(surface)
                    }
                }
            }
            ACTION_STOP_PROJECTION -> {
                stopMirroring()
                stopSelf()
            }
        }
        return START_NOT_STICKY
    }

    fun attachToCarSurface(surface: Surface, surfaceWidth: Int = 1920, surfaceHeight: Int = 1080) {
        this.activeCarSurface = surface
        val projection = mediaProjection ?: return

        virtualDisplay?.release()

        val windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val metrics = DisplayMetrics()
        @Suppress("DEPRECATION")
        windowManager.defaultDisplay.getRealMetrics(metrics)

        val densityDpi = metrics.densityDpi

        try {
            virtualDisplay = projection.createVirtualDisplay(
                "AutoMirror_AA_Display",
                surfaceWidth,
                surfaceHeight,
                densityDpi,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR or DisplayManager.VIRTUAL_DISPLAY_FLAG_PRESENTATION,
                surface,
                null,
                null
            )
            isStreaming = true
            Log.i(TAG, "Virtual display initialized onto Android Auto surface: ${surfaceWidth}x${surfaceHeight}")
        } catch (e: Exception) {
            Log.e(TAG, "Error creating virtual display for Android Auto", e)
        }
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
        virtualDisplay = null
        mediaProjection?.stop()
        mediaProjection = null
        releaseWakeLock()
        stopForeground(STOP_FOREGROUND_REMOVE)
    }

    private fun startForegroundNotification() {
        val launchIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            launchIntent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("AutoMirror is Active")
            .setContentText("Phone screen is live streaming to Android Auto display.")
            .setSmallIcon(android.R.drawable.ic_menu_slideshow)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .build()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(
                NOTIFICATION_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION
            )
        } else {
            startForeground(NOTIFICATION_ID, notification)
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "AutoMirror Projection Service",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Keeps phone screen live stream active on Android Auto"
            }
            val manager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(channel)
        }
    }

    private fun acquireWakeLock() {
        val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        wakeLock = powerManager.newWakeLock(
            PowerManager.SCREEN_DIM_WAKE_LOCK or PowerManager.ACQUIRE_CAUSES_WAKEUP,
            "AutoMirror:StreamWakeLock"
        ).apply {
            acquire(12 * 60 * 60 * 1000L) // 12 hours
        }
    }

    private fun releaseWakeLock() {
        if (wakeLock?.isHeld == true) {
            wakeLock?.release()
        }
        wakeLock = null
    }

    override fun onDestroy() {
        stopMirroring()
        super.onDestroy()
    }
}
