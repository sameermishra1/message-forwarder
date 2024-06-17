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

class SmsReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        // add log to print the intent action also add a tag to the log
        Log.d("SmsReceiver", "Received intent with action: ${intent.action}")
        if (intent.action == "android.provider.Telephony.SMS_RECEIVED") {
             val data = intent.extras
            val pdus = data?.get("pdus") as Array<*>

            for (pdu in pdus) {
                val smsMessage = SmsMessage.createFromPdu(pdu as ByteArray)    
                val phoneNumber: String = smsMessage.displayOriginatingAddress
                val messageText: String = smsMessage.displayMessageBody
                forwardMessageToTelegram(phoneNumber, messageText)
            }
             
        } 
    }
    

    private fun forwardMessageToTelegram(phoneNumber: String, messageText: String) {
        // Use telegramModule to forward the message to Telegram
        Log.d("SmsReceiver", "Received forwardMessageToTelegram: ${messageText}")
        val telegramModule = TelegramModule(MainApplication.sharedPreferencesModule)
        telegramModule.forwardMessages(mapOf(phoneNumber to arrayOf(messageText)))  
    }
}
