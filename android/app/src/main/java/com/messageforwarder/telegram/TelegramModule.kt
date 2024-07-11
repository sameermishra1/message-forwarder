package com.messageforwarder.telegram

import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException
import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.*
import kotlinx.coroutines.launch
import com.google.firebase.crashlytics.FirebaseCrashlytics
import java.lang.Exception
import java.lang.RuntimeException
import com.messageforwarder.SharedPreferencesModule
import com.messageforwarder.mmkv.MMKVService
import com.messageforwarder.BuildConfig

class TelegramModule(private val sharedPreferencesModule: SharedPreferencesModule) {
    private val coroutineScope = CoroutineScope(Dispatchers.Default + SupervisorJob())
    private val client = OkHttpClient()

    fun forwardMessages(messages: Map<String, Array<String>>) {
        messages.forEach { (key, values) ->
            values.forEach { value ->
                sendMessage(key, value)
            }
        }
    }

    private fun sendMessage(sender: String, message: String) {
        val details = sharedPreferencesModule.getDetails()
        val chat_id = details?.first
        val botToken = details?.second
        if (chat_id == null || botToken == null) {
            if (BuildConfig.DEBUG) {
                Log.e("SmsReceiver", "Chat ID or Bot Token is missing.")
            }
            return // Exit the function if either value is null
        }
        val jsonInputString = """{"chat_id": "$chat_id", "text": "$sender: $message"}"""
        val url = "https://api.telegram.org/bot$botToken/sendMessage"
        coroutineScope.launch {
            try {
                postData(jsonInputString, url)  
                val mmkv = MMKVService()
                mmkv.addOrUpdateMessage(sender, message, true)
            } catch (e: Exception) {
                if (BuildConfig.DEBUG) {
                        Log.e("SmsReceiver", "Error sending message: ${e}")
                }
                FirebaseCrashlytics.getInstance().log("TelegramModule.sendMessage failed")
                FirebaseCrashlytics.getInstance().recordException(e)
            }
        }
       
    }

     private suspend fun postData(data: String, url: String) = withContext(Dispatchers.IO) {

        if (BuildConfig.DEBUG) {
            Log.d("SmsReceiver", "Received sendMessage url: ${url} | jsonInputString: ${data}")
        }
        val body = data.toRequestBody("application/json; charset=utf-8".toMediaType())
        val request = Request.Builder()
            .url(url)
            .addHeader("Content-Type", "application/json; utf-8")
            .addHeader("Accept", "application/json")
            .post(body)
            .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) 
            { 
                throw IOException("Unexpected code $response")
            }    
            if (BuildConfig.DEBUG) {
                Log.d("SmsReceiver", "Received sendMessage response: ${response}")
            }
        }
    }

}