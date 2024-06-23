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
import java.lang.Exception
import com.google.firebase.crashlytics.FirebaseCrashlytics

class SmsModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "SmsModule"
    @ReactMethod
    fun readSmsMessages(promise: Promise) {
         if (ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(currentActivity!!, arrayOf(Manifest.permission.READ_SMS), 1)
            promise.reject("READ_SMS Event Error",  Exception("Permission not granted for READ_SMS"));
            return
         }
        val messageMap = Arguments.createMap()
        val cursor = reactContext.contentResolver.query(Telephony.Sms.CONTENT_URI,arrayOf(Telephony.Sms.ADDRESS, Telephony.Sms.BODY), null, null, Telephony.Sms.Inbox.DEFAULT_SORT_ORDER)
        if (cursor?.moveToFirst() == true) {
            val addressIndex = cursor.getColumnIndex(Telephony.Sms.ADDRESS)
            val bodyIndex = cursor.getColumnIndex(Telephony.Sms.BODY)

            if (addressIndex != -1 && bodyIndex != -1) {
            val address = cursor.getString(addressIndex)
            val body = cursor.getString(bodyIndex)
            cursor.close()
            messageMap.putString(address, body)
            promise.resolve(messageMap)
            }
        }
        else {
                FirebaseCrashlytics.getInstance().recordException(Exception("SmsModule.readSmsMessages failed.Error reading SMS messages"))            
                promise.reject("READ_SMS Event Error",  Exception("Error reading SMS messages"));
        }
    }
}