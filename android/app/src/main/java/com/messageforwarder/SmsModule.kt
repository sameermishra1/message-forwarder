package com.messageforwarder

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.provider.Telephony
import android.util.Log
import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray

class SmsModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "SmsModule"
    @ReactMethod
    fun readSmsMessages(promise: Promise) {
        Log.d("SmsModule", "Request for reading messages received.")
         if (ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(currentActivity!!, arrayOf(Manifest.permission.READ_SMS), 1)
            promise.reject("Create Event Error",  Exception("Permission not granted"));
         }
        val messageMap = Arguments.createMap()
        val cursor = reactContext.contentResolver.query(Telephony.Sms.CONTENT_URI, null, null, null, null)
        cursor?.use {
           while (cursor.moveToNext()) {
                val address = cursor.getString(cursor.getColumnIndex(Telephony.Sms.ADDRESS))
                val body = cursor.getString(cursor.getColumnIndex(Telephony.Sms.BODY))

                val oldMessageArray = messageMap.getArray(address)
                val messageArray = Arguments.createArray()
                if (oldMessageArray != null) {
                    for (i in 0 until oldMessageArray.size()) {
                    messageArray.pushString(oldMessageArray.getString(i))
                }
            }
                messageArray.pushString(body)
                messageMap.putArray(address, messageArray)
            }
        }
        promise.resolve(messageMap)
    }
}