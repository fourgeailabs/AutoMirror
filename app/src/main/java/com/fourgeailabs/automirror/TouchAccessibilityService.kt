package com.fourgeailabs.automirror

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.graphics.Path
import android.util.Log
import android.view.accessibility.AccessibilityEvent

class TouchAccessibilityService : AccessibilityService() {

    companion object {
        private const val TAG = "AutoMirrorTouchService"
        var instance: TouchAccessibilityService? = null
            private set

        /**
         * Dispatches a tap gesture on the phone screen given absolute coordinates.
         */
        fun performTap(x: Float, y: Float): Boolean {
            val service = instance ?: return false
            val path = Path().apply {
                moveTo(x, y)
            }
            val stroke = GestureDescription.StrokeDescription(path, 0, 50)
            val gesture = GestureDescription.Builder().addStroke(stroke).build()
            return service.dispatchGesture(gesture, null, null)
        }

        /**
         * Dispatches a swipe or drag gesture on the phone screen.
         */
        fun performSwipe(startX: Float, startY: Float, endX: Float, endY: Float, durationMs: Long): Boolean {
            val service = instance ?: return false
            val path = Path().apply {
                moveTo(startX, startY)
                lineTo(endX, endY)
            }
            val stroke = GestureDescription.StrokeDescription(path, 0, durationMs)
            val gesture = GestureDescription.Builder().addStroke(stroke).build()
            return service.dispatchGesture(gesture, null, null)
        }
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        instance = this
        Log.i(TAG, "AutoMirror TouchAccessibilityService connected.")
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // No-op: Only used for outbound gesture dispatch from Android Auto touch feedback
    }

    override fun onInterrupt() {
        Log.w(TAG, "AutoMirror TouchAccessibilityService interrupted.")
    }

    override fun onDestroy() {
        super.onDestroy()
        if (instance == this) {
            instance = null
        }
    }
}
