package com.messageforwarder.mmkv

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.messageforwarder.mmkv.MMKVService
import com.tencent.mmkv.MMKV
import java.lang.Exception
import com.facebook.react.bridge.Promise

class MMKVModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    init {
        MMKV.initialize(reactContext)
    }

    override fun getName(): String {
        return "MMKVModule"
    } 
    @ReactMethod
    fun setItem(sender: String, messageText: String, isSynced: Boolean, callback: Callback) {
        // call MMKVService.addOrUpdateMessage to save the message
        try{
            val mmkvService = MMKVService()
            mmkvService.addOrUpdateMessage(sender, messageText, isSynced)
            callback.invoke(null, "Message saved successfully")
        } catch (e: Exception) {    
             callback.invoke("Error saving message", null)
        }
    }

    @ReactMethod
    fun getItem(sender: String, callback: Callback) {
        // call MMKVService.getItem to get the message
        val mmkvService = MMKVService()
        val message = mmkvService.getItem(sender)
        callback.invoke(null, message)
    }

    //function to get first 10 messages
    @ReactMethod
    fun getFirstTenMessages(promise: Promise) {
        // call MMKVService.getFirstTenMessages to get the first 10 messages
        val mmkvService = MMKVService()
        val messages = mmkvService.getFirstTenMessages()
        promise.resolve(messages)
    }
}