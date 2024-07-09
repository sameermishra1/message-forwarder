package com.messageforwarder

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.messageforwarder.mmkv.MMKVModule

class SmsModulePackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

   override fun createNativeModules(
    reactContext: ReactApplicationContext
        ): MutableList<NativeModule> {
            val sharedPreferencesModule = SharedPreferencesModule(reactContext)
            val smsModule = SmsModule(reactContext)
            val mmkvModule = MMKVModule(reactContext)
            return listOf(smsModule, sharedPreferencesModule,mmkvModule).toMutableList()
}

}