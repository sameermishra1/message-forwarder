# Project Title

Message Forwarder android app that forwards the sms messages from phone from to an Endpoint and chat id . User has to provide the Endpoint and chat id for forwarding the messages.
App uses the SMS Retriever API to get the sms messages from the phone and then forwards the messages to the Endpoint and chat id, app needs to be running in the background to forward the messages and requires the user to provide the permission to read the sms messages.

# Getting Started
## Step 1: Code setup
1.1 Clone the repository and navigate to the project directory. Add gradle.properties file in the android folder and add the following lines to the file
```bash
org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=512m
android.useAndroidX=true
android.enableJetifier=true
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
newArchEnabled=false
hermesEnabled=true
FORWARD_RELEASE_KEY_STORE_FILE=
FORWARD_RELEASE_KEY_STORE_PASSWORD=
FORWARD_RELEASE_KEY_ALIAS=
FORWARD_RELEASE_KEY_PASSWORD=
``` 

provide the keystore file path (FORWARD_RELEASE_KEY_STORE_FILE), password (FORWARD_RELEASE_KEY_STORE_PASSWORD), alias (FORWARD_RELEASE_KEY_ALIAS) and password (FORWARD_RELEASE_KEY_PASSWORD; could be same as FORWARD_RELEASE_KEY_STORE_PASSWORD)for the release build.

1.2 Generate and add google-services.json to the android/app folder for the firebase messaging service.

1.3 Generate and add forward-app-key.keystore file to the android/app folder for the release build.

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ app:

```bash
# using npm
npx react-native run-android
```

To run the production release on emulator run
```bash
npm run android -- --mode="release"    
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_  shortly provided you have set up your emulator/simulator correctly.
This is one way to run your app — you can also run it directly from within Android Studio  respectively.

# Log
```bash
adb logcat -s "SmsReceiver"  
```

# Useful Commands
```bash
# create production release build and deploy to emulator or physical device connected via usb
npx react-native run-android --mode release 
# to uninstall the app from the device
adb -s <DEVICE_ID> uninstall com.messageforwarder 
# to scan the logs for relevant information
adb -s <DEVICE_ID>  logcat | grep "SmsReceiver"
# create production release bundle
cd android
./gradlew assembleRelease # for APK
./gradlew bundleRelease # for AAB

```
