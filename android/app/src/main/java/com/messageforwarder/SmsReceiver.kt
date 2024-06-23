package com.messageforwarder

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.telephony.SmsMessage
import com.messageforwarder.TelegramModule
import com.messageforwarder.MainApplication
import android.os.Build
import android.util.Log
import android.provider.Telephony

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
                    forwardMessageToTelegram(sender, body)
                }
            }           
        }
    }
    
    private fun forwardMessageToTelegram(phoneNumber: String, messageText: String) {
        if (BuildConfig.DEBUG) {
            Log.d("SmsReceiver", "Received forwardMessageToTelegram: ${messageText}")
        }
        val telegramModule = TelegramModule(MainApplication.sharedPreferencesModule)
        telegramModule.forwardMessages(mapOf(phoneNumber to arrayOf(messageText)))  
    }
}
