package com.fourgeailabs.automirror

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class AutoConnectionReceiver : BroadcastReceiver() {
    companion object {
        private const val TAG = "AutoConnectionReceiver"
        const val EXTRA_CAR_CONNECTION_STATE = "CarConnectionState"
        const val CONNECTION_TYPE_CONNECTED = "CONNECTED"
    }

    override fun onReceive(context: Context, intent: Intent) {
        val action = intent.action
        Log.i(TAG, "Received Android Auto broadcast: $action")
        if ("com.google.android.gms.car.CAR_CONNECTION_STATE" == action) {
            val state = intent.getStringExtra(EXTRA_CAR_CONNECTION_STATE)
            Log.i(TAG, "Android Auto connection state: $state")
        }
    }
}
