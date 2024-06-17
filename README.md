# Project Title

Message Forwarder android app that forwards the sms messages from phone from to a telegram channels. User has to provide the telegram channel id and token for forwarding the messages.
App uses the SMS Retriever API to get the sms messages from the phone and then forwards the messages to the telegram channel, app needs to be running in the background to forward the messages and requires the user to provide the permission to read the sms messages.

# Getting Started

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ app:

```bash
# using npm
npx react-native run-android
```


If everything is set up _correctly_, you should see your new app running in your _Android Emulator_  shortly provided you have set up your emulator/simulator correctly.
This is one way to run your app — you can also run it directly from within Android Studio  respectively.

# Log
```bash
adb logcat -s "SmsReceiver"  
```

