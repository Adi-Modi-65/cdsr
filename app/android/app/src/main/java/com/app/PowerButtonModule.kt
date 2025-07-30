package com.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule

class PowerButtonModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val context: ReactApplicationContext = reactContext
    private var receiver: BroadcastReceiver? = null

    override fun getName(): String {
        return "PowerButtonModule"
    }

    override fun initialize() {
        super.initialize()
        registerPowerReceiver()
    }

    private fun registerPowerReceiver() {
        receiver = object : BroadcastReceiver() {
            override fun onReceive(ctx: Context?, intent: Intent?) {
                when (intent?.action) {
                    Intent.ACTION_SCREEN_ON -> sendEvent("screenOn")
                    Intent.ACTION_SCREEN_OFF -> sendEvent("screenOff")
                }
            }
        }

        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_SCREEN_ON)
            addAction(Intent.ACTION_SCREEN_OFF)
        }

        context.registerReceiver(receiver, filter)
    }

    private fun sendEvent(event: String) {
        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("PowerButtonEvent", event)
    }
}