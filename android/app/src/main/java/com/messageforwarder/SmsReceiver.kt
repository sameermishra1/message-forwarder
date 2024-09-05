package com.messageforwarder

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.telephony.SmsMessage
import com.messageforwarder.sync.PushModule
import com.messageforwarder.MainApplication
import android.os.Build
import android.util.Log
import android.provider.Telephony
import com.messageforwarder.mmkv.MMKVService

class SmsReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (BuildConfig.DEBUG) {
            Log.d("SmsReceiver", "Received intent with action: ${intent.action}")
        }
        if (intent.action == "android.provider.Telephony.SMS_RECEIVED") {

            val messages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
            for (message in messages) {
                val sender: String? = message.originatingAddress
                val body: String? = message.messageBody
                if (sender != null && body != null) {
                    // call addOrUpdateMessage method from MMKVService and save the message
                    val mmkv = MMKVService()
                    mmkv.addOrUpdateMessage(sender, body, false)
                    forwardMessage(sender, body)
                }
            }           
        }
    }
    
    private fun forwardMessage(phoneNumber: String, messageText: String) {
        if (BuildConfig.DEBUG) {
            Log.d("SmsReceiver", "Received forwardMessage: ${messageText}")
        }
        val pushModule = PushModule(MainApplication.sharedPreferencesModule)
        pushModule.pushMessages(mapOf(phoneNumber to arrayOf(messageText)))  
    }

}
