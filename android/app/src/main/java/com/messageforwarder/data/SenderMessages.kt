package com.messageforwarder.data

data class Message(
    val text: String,
    var isSynced: Boolean = false
)

data class SenderMessages(
    val sender: String,
    val messages: MutableList<Message> = mutableListOf()
)