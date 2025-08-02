package com.app.sms

import android.telephony.SmsManager
import android.widget.Toast
import com.facebook.react.bridge.*

class SmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    private val context = reactContext

    override fun getName(): String {
        return "SmsModule"
    }

    @ReactMethod
    fun sendSms(phoneNumber: String, message: String, promise: Promise) {
        try {
            val smsManager = SmsManager.getDefault()
            smsManager.sendTextMessage(phoneNumber, null, message, null, null)
            promise.resolve("SMS sent successfully")
        } catch (e: Exception) {
            promise.reject("SMS_ERROR", "Failed to send SMS", e)
        }
    }

    @ReactMethod
    fun sendBulkSms(phoneNumbers: ReadableArray, message: String, promise: Promise) {
        try {
            val smsManager = SmsManager.getDefault()
            for (i in 0 until phoneNumbers.size()) {
                val phone = phoneNumbers.getString(i)
                smsManager.sendTextMessage(phone, null, message, null, null)
            }
            promise.resolve("Bulk SMS sent successfully")
        } catch (e: Exception) {
            promise.reject("SMS_ERROR", "Failed to send bulk SMS", e)
        }
    }
}
