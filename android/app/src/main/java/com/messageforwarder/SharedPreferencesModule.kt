package com.messageforwarder

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import java.lang.Exception
import kotlin.Pair
import kotlin.String
import kotlin.Unit
import kotlin.invoke
import com.google.firebase.crashlytics.FirebaseCrashlytics

class SharedPreferencesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SharedPreferencesModule"
    }

    @ReactMethod
    fun saveDetails(endpoint: String, chatID: String, callback: Callback) {
        try {
            val sharedPreferences: SharedPreferences = reactApplicationContext.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
            val editor: SharedPreferences.Editor = sharedPreferences.edit()
            editor.putString("endpoint", endpoint)
            editor.putString("chatID", chatID)
            editor.apply()      
            callback.invoke(true)
        } catch (e: Exception) {
                FirebaseCrashlytics.getInstance().log("SharedPreferencesModule.saveDetails failed")
                FirebaseCrashlytics.getInstance().recordException(e)
                callback.invoke(false)
        }
    }


    fun getDetails(): Pair<String?,String?>? {
        val sharedPreferences: SharedPreferences = reactApplicationContext.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val chatID = sharedPreferences.getString("chatID", null)
        val endpoint = sharedPreferences.getString("endpoint", null)
        val details = Pair(chatID, endpoint)
        return details
    }
}