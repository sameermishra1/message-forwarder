package com.messageforwarder
import java.net.HttpURLConnection
import java.net.URL
import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class TelegramModule(private val sharedPreferencesModule: SharedPreferencesModule) {
    fun forwardMessages(messages: Map<String, Array<String>>) {
        messages.forEach { (key, values) ->
            values.forEach { value ->
                sendMessage("$key: $value")
            }
        }
    }

    private fun sendMessage(message: String) {
        val details = sharedPreferencesModule.getDetails()
        val chat_id = details!!.first
        val botToken = details!!.second
        val url = URL("https://api.telegram.org/bot$botToken/sendMessage")
        val jsonInputString = """{"chat_id": "$chat_id", "text": "$message"}"""

        if (BuildConfig.DEBUG) {
            Log.d("SmsReceiver", "Received sendMessage url: ${url} | jsonInputString: ${jsonInputString}")
        }
        GlobalScope.launch(Dispatchers.IO) {
            try {
                with(url.openConnection() as HttpURLConnection) {
                    requestMethod = "POST"
                    setRequestProperty("Content-Type", "application/json; utf-8")
                    setRequestProperty("Accept", "application/json")
                    doOutput = true

                    outputStream.write(jsonInputString.toByteArray(Charsets.UTF_8))
                    Log.d("SmsReceiver", "Received sendMessage responseCode: ${responseCode}")
                    Log.d("SmsReceiver", "Received sendMessage responseMessage: ${responseMessage}")
                }
            } catch (e: Exception) {
                if (BuildConfig.DEBUG) {
                    Log.e("SmsReceiver", "Error sending message: ${e}")
                }
            }
        }
    }

}