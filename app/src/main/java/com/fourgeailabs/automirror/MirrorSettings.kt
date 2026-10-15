package com.fourgeailabs.automirror

import android.content.Context
import android.content.SharedPreferences

data class DisplayResolution(val width: Int, val height: Int, val label: String)

object MirrorSettings {
    private const val PREFS_NAME = "automirror_settings"

    const val KEY_RESOLUTION = "pref_resolution"
    const val KEY_FPS = "pref_fps"
    const val KEY_BITRATE = "pref_bitrate"
    const val KEY_ASPECT_RATIO_MODE = "pref_aspect_mode" // 24:9, 16:9, 21:9, 4:3
    const val KEY_AUDIO_STREAMING = "pref_audio_streaming"
    const val KEY_ROTATION_LOCK = "pref_rotation_lock"
    const val KEY_TOUCH_RELAY = "pref_touch_relay"
    const val KEY_KEEP_SCREEN_ON = "pref_keep_screen_on"
    const val KEY_DIM_PHONE_SCREEN = "pref_dim_phone_screen"

    // Primary 24:9 Panoramic Ultrawide Display Preset (8:3 Ratio e.g. 2880x1080 or 1920x720)
    val RESOLUTION_24_9 = DisplayResolution(2880, 1080, "24:9 Panoramic Ultrawide (2880x1080)")
    val RESOLUTION_21_9 = DisplayResolution(2560, 1080, "21:9 Ultrawide (2560x1080)")
    val RESOLUTION_16_9 = DisplayResolution(1920, 1080, "16:9 Standard Widescreen (1920x1080)")
    val RESOLUTION_720P = DisplayResolution(1280, 720, "720p HD (1280x720)")

    private fun getPrefs(context: Context): SharedPreferences {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }

    fun getFps(context: Context): Int {
        return getPrefs(context).getInt(KEY_FPS, 60)
    }

    fun setFps(context: Context, fps: Int) {
        getPrefs(context).edit().putInt(KEY_FPS, fps).apply()
    }

    fun getBitrate(context: Context): Int {
        return getPrefs(context).getInt(KEY_BITRATE, 12_000_000) // 12 Mbps
    }

    fun setBitrate(context: Context, bitrate: Int) {
        getPrefs(context).edit().putInt(KEY_BITRATE, bitrate).apply()
    }

    fun isAudioStreamingEnabled(context: Context): Boolean {
        return getPrefs(context).getBoolean(KEY_AUDIO_STREAMING, true)
    }

    fun setAudioStreamingEnabled(context: Context, enabled: Boolean) {
        getPrefs(context).edit().putBoolean(KEY_AUDIO_STREAMING, enabled).apply()
    }

    fun isTouchRelayEnabled(context: Context): Boolean {
        return getPrefs(context).getBoolean(KEY_TOUCH_RELAY, true)
    }

    fun setTouchRelayEnabled(context: Context, enabled: Boolean) {
        getPrefs(context).edit().putBoolean(KEY_TOUCH_RELAY, enabled).apply()
    }

    fun getAspectRatioMode(context: Context): String {
        return getPrefs(context).getString(KEY_ASPECT_RATIO_MODE, "24:9") ?: "24:9"
    }

    fun setAspectRatioMode(context: Context, mode: String) {
        getPrefs(context).edit().putString(KEY_ASPECT_RATIO_MODE, mode).apply()
    }

    fun getKeepScreenOn(context: Context): Boolean {
        return getPrefs(context).getBoolean(KEY_KEEP_SCREEN_ON, true)
    }
}
