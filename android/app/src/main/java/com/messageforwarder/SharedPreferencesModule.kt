package com.messageforwarder

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class SharedPreferencesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SharedPreferencesModule"
    }

    @ReactMethod
    fun saveDetails(token: String, chatID: String, callback: Callback) {
        try {
            val sharedPreferences: SharedPreferences = reactApplicationContext.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
            val editor: SharedPreferences.Editor = sharedPreferences.edit()
            editor.putString("telegram_token", token)
            editor.putString("telegram_chatID", chatID)
            editor.apply()
            callback.invoke(true)
        } catch (e: Exception) {
            callback.invoke(false)
        }
    }


    fun getDetails(): Pair<String?,String?>? {
        val sharedPreferences: SharedPreferences = reactApplicationContext.getSharedPreferences("MyAppPreferences", Context.MODE_PRIVATE)
        val token = sharedPreferences.getString("telegram_token", null)
        val chatID = sharedPreferences.getString("telegram_chatID", null)
        val details = Pair(chatID, token)
        return details
    }
}