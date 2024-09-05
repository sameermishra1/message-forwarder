// create a MMKVService class that creates a MMKV instance and provides methods to add or get messages from MMKV.
package com.messageforwarder.mmkv

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.tencent.mmkv.MMKV
import com.messageforwarder.data.Message
import com.messageforwarder.data.SenderMessages

class MMKVService {
    private val mmkv = MMKV.defaultMMKV()
    private val gson = Gson()

    fun addOrUpdateMessage(sender: String, messageText: String, isSynced: Boolean) {
        val type = object : TypeToken<SenderMessages>() {}.type
        val json = mmkv.decodeString(sender)
        val senderMessages: SenderMessages = if (json != null) {
            gson.fromJson(json, type)
        } else {
            SenderMessages(sender)
        }
        val existingMessage = senderMessages.messages.find { it.text == messageText }
        if (existingMessage != null) {
            existingMessage.isSynced = isSynced
        } else {
            senderMessages.messages.add(Message(messageText, isSynced))
        }
        val updatedJson = gson.toJson(senderMessages, type)
        mmkv.encode(sender, updatedJson)
    }

    fun getItem(sender: String): String? {
        val type = object : TypeToken<SenderMessages>() {}.type
        val json = mmkv.decodeString(sender)
        val senderMessages: SenderMessages? = if (json != null) {
            gson.fromJson(json, type)
        } else {
            null
        }
        return if (senderMessages != null) {
            gson.toJson(senderMessages.messages)
        } else {
            null
        }
    }

   // Function to get first 10 messages
    fun getFirstTenMessages(): String {
        val messages = mutableListOf<SenderMessages>()
        val keys = mmkv.allKeys()
        
        keys?.forEach { key ->
            val type = object : TypeToken<SenderMessages>() {}.type
            val json = mmkv.decodeString(key)
            val senderMessages: SenderMessages = gson.fromJson(json, type)
            messages.add(senderMessages)
        }
        
        // Sort messages by the timestamp of the last message in each SenderMessages
        val firstTenMessages = messages.take(10)
        return gson.toJson(firstTenMessages)
    }
}